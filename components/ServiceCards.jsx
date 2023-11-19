import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ServiceCards = ({ screenName, imageSource, cardText }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigation} activeOpacity={0.7}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardText}>{cardText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // card: {
  //   backgroundColor: '#45B3CB',
  //   borderRadius: 8,
  //   width: '30%',
  //   height: 180,
  //   marginBottom: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 5,
  //   marginRight: 5,
  // },
  // cardImage: {
  //   width: '100%',
  //   height: '80%',
  //   marginTop: 20,
  // },
  // cardText: {
  //   marginTop: 10,
  //   marginBottom: 10,
  //   fontSize: 9,
  //   color: 'white',
  // },
  card: {
    backgroundColor: '#45B3CB',
    borderRadius: 8,
    width: '47%',
    height: 140,
    marginRight: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: '80%',
    padding: 5,
  },
  cardText: {
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 13,
    color: 'white',
    borderRadius: 8,
    padding: 5,
  },
});

export default ServiceCards;
