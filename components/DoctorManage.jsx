import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const DoctorManage = ({ doctorInfo, onPress, onRemove }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = async () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRemove = async () => {
    try {
      if (onRemove) {
        onRemove(); // Call the onRemove function passed as a prop
      }

      // Make a DELETE request to remove the item from the API
      await axios.delete(`${API_URL}/doctors/${doctorInfo.id}`);
      console.log('Item removed from API successfully');

      closeModal();
    } catch (error) {
      console.error('Error removing item from API:', error);
      if (error.response) {
        console.log('Error response from server:', error.response.data);
      }
      alert('Error removing item. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <View style={styles.profileContainer}>
          <Image source={doctorInfo.image} style={styles.profileImage} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{doctorInfo.username}</Text>
          <Text style={styles.specialty}>
            <FontAwesome name="user-md" size={16} color="#45B3CB" /> {doctorInfo.specialization}
          </Text>
          <Text style={styles.price}>
            <FontAwesome name="dollar" size={16} color="#45B3CB" /> {doctorInfo.price}
          </Text>
          <Text style={styles.waitingPeriod}>
            <FontAwesome name="hourglass" size={16} color="#45B3CB" /> {doctorInfo.appointments}
          </Text>
          <View style={styles.horizontalLine} />
        </View>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'col',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'gray',
    elevation: 5,
    marginBottom: 5,
  },
  profileContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
  },
  price: {
    fontSize: 14,
  },
  waitingPeriod: {
    fontSize: 14,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  popupText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#45B3CB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: '#FF0000', // Red color for the remove button
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DoctorManage;
