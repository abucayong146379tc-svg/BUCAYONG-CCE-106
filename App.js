import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCalculation = () => {
    setErrorMsg('');
    setResult(null);

    if (input.trim() === '') {
      setErrorMsg('Please enter an expression.');
      return;
    }

    const match = input.match(/^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/);
    if (!match) {
      setErrorMsg('Invalid format. Use: number operator number.');
      return;
    }

    const n1 = parseFloat(match[1]);
    const operation = match[2];
    const n2 = parseFloat(match[3]);

    let res = 0;
    switch (operation) {
      case '+':
        res = n1 + n2;
        break;
      case '-':
        res = n1 - n2;
        break;
      case '*':
        res = n1 * n2;
        break;
      case '/':
        if (n2 === 0) {
          setErrorMsg('Error: Division by zero is not allowed.');
          return;
        }
        res = n1 / n2;
        break;
      default:
        return;
    }

    setResult(res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Simple Calculator</Text>
      
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
      />

      <View style={styles.symbolRow}>
        <TouchableOpacity style={styles.symbolButton} onPress={() => setInput(input + ' + ')}>
          <Text style={styles.symbolButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.symbolButton} onPress={() => setInput(input + ' - ')}>
          <Text style={styles.symbolButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.symbolButton} onPress={() => setInput(input + ' * ')}>
          <Text style={styles.symbolButtonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.symbolButton} onPress={() => setInput(input + ' / ')}>
          <Text style={styles.symbolButtonText}>/</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleCalculation}>
          <Text style={styles.buttonText}>Calculate (=)</Text>
        </TouchableOpacity>
      </View>

      {errorMsg !== '' && (
        <Text style={styles.errorText}>{errorMsg}</Text>
      )}

      {result !== null && (
        <Text style={styles.resultText}>Result: {result}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 20,
    color: '#000',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  symbolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  symbolButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  symbolButtonText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
  },
  resultText: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 30,
  }
});
