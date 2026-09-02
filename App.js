import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const incrementValue = 1;

  const handleIncrement = () => {
    setCount(count + incrementValue);
  };

  const handleDecrement = () => {
    if (count - incrementValue >= 0) {
      setCount(count - incrementValue);
    } else {
      setCount(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Counter App</Text>
      <Text style={styles.counterValue}>{count}</Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-{incrementValue}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+{incrementValue}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  counterValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
    gap: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
