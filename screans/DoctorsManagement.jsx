import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import DoctorManage from '../components/DoctorManage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const DoctorsManagement = () => {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/doctors`)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const handleDoctorPress = (doctorId) => {
    navigation.navigate('DoctorDetails', { doctorId });
  };

  const handleRemove = async (doctorId) => {
    try {
      // Filter out the removed doctor locally
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
      setDoctors(updatedDoctors);

      // Make a DELETE request to remove the item from the API
      await axios.delete(`${API_URL}/doctors/${doctorId}`);
      console.log('Item removed from API successfully');

    } catch (error) {
      console.error('Error removing item from API:', error);
      if (error.response) {
        console.log('Error response from server:', error.response.data);
      }
      alert('Error removing item. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {doctors.map((doctor) => (
          <DoctorManage
            key={doctor.id}
            doctorInfo={doctor}
            onPress={() => handleDoctorPress(doctor.id)}
            onRemove={() => handleRemove(doctor.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    marginTop: 0,
    flexDirection:'row',
  },
});

export default DoctorsManagement;
