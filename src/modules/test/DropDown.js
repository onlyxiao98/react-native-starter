import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';

const Dropdown = ({ options, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>{selectedOption ? selectedOption.label : 'Select Option'}</Text>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSelect(option)}
                style={styles.option}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    maxHeight: 200,
    width: '80%',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
  },
});

export default Dropdown;
