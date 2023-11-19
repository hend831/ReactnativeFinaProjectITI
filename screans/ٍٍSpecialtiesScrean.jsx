
import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DoctorsScrean from '../screans/DoctorsScrean';
import ServiceCards from '../components/ServiceCards'; // Import the ServiceCard component
import { ScrollView } from 'react-native-web';

export default function SpecialtiesScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Medical Specialties</Text>
      <ScrollView>
      <View style={styles.grid}>
        <View style={styles.row}>
          <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s1.png')}
            cardText="Cardiology"
          />
          <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s2.png')}
            cardText="Nephrology"
          />
          </View>
          <View style={styles.row}>
          <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s3.png')}
            cardText="Pediatrics"
          />
          <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s6.png')}
            cardText="Neurology"
          />
        </View>
        <View style={styles.row}>
        <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s4.png')}
            cardText="Gynecology"
          />
         
         <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s9.png')}
            cardText="Oral and dental"
          />
          {/* Add more ServiceCard components here as needed */}
        </View>
        <View style={styles.row}>
        <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s7.png')}
            cardText="Ophthalmology"
          />
          <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s8.png')}
            cardText="Dermatology"
          />
          </View>
          <View style={styles.row}>
         
           <ServiceCards
            screenName="doctors"
            imageSource={require('../assets/s5.png')}
            cardText="Gastroenterology"
          />
          {/* Add more ServiceCard components here as needed */}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor:'#eaf6f6',
  },
  grid: {
    alignItems: 'center',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    marginTop:10,
    width:'100%',
  },
  text: {
    marginBottom: 10,
    fontSize: 20,
  },
  
});
// Rest of your styles...
