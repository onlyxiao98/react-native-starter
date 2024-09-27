import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.bar, { width: `${progress}%` }]}
        onPress={onPress}
      >
        <Text style={styles.label}>{progress}%</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
    height: 10,
    width: 100,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProgressBar;
