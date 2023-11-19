
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Platform, BackHandler } from 'react-native';

const FormPage = () => {
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [patientComplaint, setPatientComplaint] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', () => {
      // Handle back button press for Android here
      return true; // Prevent default behavior
    });
  }
  const handleFormSubmit = () => {
    if (!name || !age || !patientComplaint) {
      alert('Please fill in all required fields');
      return;
    }

    setModalVisible(true);
  };

  const closeModal = () => {
    
    navigation.navigate('Main '); 
    setModalVisible(false);// Replace 'Home' with the name of your home screen in your navigation stack
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Type Your Complaint</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Chronic Diseases"
        value={chronicDiseases}
        onChangeText={(text) => setChronicDiseases(text)}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Patient Complaint"
        multiline={true}
        numberOfLines={4}
        value={patientComplaint}
        onChangeText={(text) => setPatientComplaint(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Your request is done we will send you a message!</Text>
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#45B3CB',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textArea: {
    backgroundColor: 'white',
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#45B3CB',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#45B3CB',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default FormPage;

