
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Lab from './../components/Lab';
import axios from "axios";

const API_URL = "http://localhost:3000";

const LabScreen = () => {
  const navigation = useNavigation();

  // Define the data for the doctors
  const [labs, setlabs] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors from the API
    axios.get(`${API_URL}/labs`)
      .then((response) => {
        setlabs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  // Handle the onPress event when a doctor's profile is clicked
  const handleDoctorPress = (labId) => {
    // You can navigate to another screen here using your navigation system
    // For example, if you're using React Navigation, you can do:
    navigation.navigate('DoctorDetails', { labId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {labs.map((lab) => (
          <Lab
            key={lab.id}
            labInfo={lab}
            onPress={() => handleDoctorPress(lab.id)}
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

export default LabScreen;
