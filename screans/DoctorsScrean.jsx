
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Doctors from '../components/Doctors'; // Import the Doctors component
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const API_URL = "http://localhost:3000";

const DoctorsScreen = () => {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/doctors`)
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {doctors.map((doctor) => (
          <Doctors
            key={doctor.id}  // Assuming id_doctor is a unique identifier
            doctorInfo={doctor}
            onPress={() => handleDoctorPress(doctor.id_doctor)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbe4e9',
    marginTop: 0,
  },
});

export default DoctorsScreen;

