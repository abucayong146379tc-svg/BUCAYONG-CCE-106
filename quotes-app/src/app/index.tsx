import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Quote = {
  quote: string;
  author: string;
};

export default function HomeScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://dummyjson.com/quotes/random'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data = await response.json();

      setQuote({
        quote: data.quote,
        author: data.author,
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Quote</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading quote...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>

          <Pressable style={styles.button} onPress={fetchQuote}>
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>
        </View>
      ) : quote ? (
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>"{quote.quote}"</Text>

          <Text style={styles.author}>— {quote.author}</Text>

          <Pressable style={styles.button} onPress={fetchQuote}>
            <Text style={styles.buttonText}>New Quote</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },

  center: {
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },

  quoteContainer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    elevation: 4,
  },

  quote: {
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  author: {
    fontSize: 18,
    textAlign: 'right',
    marginTop: 20,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#222222',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});