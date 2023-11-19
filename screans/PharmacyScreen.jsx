
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Pharmacy from '../components/Pharmacy'; // Import the Doctors component
import { useNavigation } from '@react-navigation/native';
import axios from "axios";


const API_URL = "http://localhost:3000";

const PharmacyScreen = () => {
  const navigation = useNavigation();
  const [pharms, setpharms] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors from the API
    axios.get(`${API_URL}/pharmacies`)
      .then((response) => {
        setpharms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  // Define the data for the doctors
  

  // Handle the onPress event when a doctor's profile is clicked
  const handleDoctorPress = (pharmacyId) => {
    // You can navigate to another screen here using your navigation system
    // For example, if you're using React Navigation, you can do:
    navigation.navigate('DoctorDetails', { pharmacyId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {pharms.map ((pharmacy) => (
          <Pharmacy
            key={pharmacy.id}
            pharmacyInfo={pharmacy}
            onPress={() => handleDoctorPress(pharmacy.id)}
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

export default PharmacyScreen;
