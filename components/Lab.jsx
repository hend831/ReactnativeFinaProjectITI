import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import PeopleList from "../screans/PeopleList";
import { useNavigation } from '@react-navigation/native';
const API_URL = "http://localhost:3000";

const Lab = ({ labInfo, onPressChatPage }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleaddfriend = async () => {
    const storedData = await AsyncStorage.getItem("patient");
    alert("User registered successfully");
    let parseduser;
    if (storedData) {
      parseduser = JSON.parse(storedData);
    }
    const lab = labInfo.id;
    const patient = parseduser[0].id;

    try {
      const response = await axios.post(`${API_URL}/addfriendlab`, {
        pat_id: patient,
        friend_lab_id: lab,
      });
      console.log(response.data);

      navigation.navigate("peopleList");
      closeModal();
    } catch (error) {
      console.log(error);
      alert("laboratory is already exist in your friends");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.labCard}>
        <View style={styles.profileContainer}>
          <Image source=
          // {labInfo.image}
          {require('../../New folder (11)/assets/labb.png')}
           style={styles.profileImage} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{labInfo.username}</Text>
          <Text style={styles.address}>
            <FontAwesome name="map-marker" size={16} color="#45B3CB" />{" "}
            {labInfo.address}
          </Text>
          {/* <Text style={styles.price}>
            <FontAwesome name="dollar" size={16} color="#45B3CB" /> {labInfo.HomeService}
          </Text> */}
          {/* <Text style={styles.mobileNumber}>
            <FontAwesome name="mobile" size={16} color="#45B3CB" /> {labInfo.mobileNumber}
          </Text> */}
          {/* <Text style={styles.waitingPeriod}>
            <FontAwesome name="comments" size={16} color="#45B3CB" /> {labInfo.message}
          </Text> */}
          <View style={styles.horizontalLine} />
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.popupText}>Hello </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleaddfriend}
            >
              <Text style={styles.buttonText}>Chat With laboratory</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 5,
    marginBottom:5,
  },
  labCard: {
    flexDirection: "row",
  },
  profileContainer: {},
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight:20,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
  },
  waitingPeriod: {
    fontSize: 14,
  },
  mobileNumber: {
    fontSize: 14,
  },
  // horizontalLine: {
  //   borderBottomColor: "gray",
  //   borderBottomWidth: 1,
  //   marginVertical: 8,
  // },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  popupText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: "#45B3CB",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Lab;
