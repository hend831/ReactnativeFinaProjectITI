import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://localhost:3000";

function PeopleList({ navigation }) {
  
  /* const [friends, setfriends] = useState([]);
  
  useEffect(() => {
    const hundelfetchfriends = async () => {
      const storedData1 = await AsyncStorage.getItem("doctor");
      const storedData = await AsyncStorage.getItem("patient");
      const storedData2 = await AsyncStorage.getItem("pharmacy");
      const storedData3 = await AsyncStorage.getItem("lab");
      if (storedData!=null) {
        alert("User registered successfully");
        let parseduser;
        if (storedData) {
          parseduser = JSON.parse(storedData);
        }
        const patient = parseduser[0].id_patient;
        axios
          .get(`${API_URL}/friendsOfDoc`, {
            params: {
              pat_id: patient,
            },
          })
          .then((response) => {
            setfriends(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
          axios
          .get(`${API_URL}/friendsOfLab`, {
            params: {
              pat_id: patient,
            },
          })
          .then((response) => {
            setfriends(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
          axios
          .get(`${API_URL}/friendsOfPharm`, {
            params: {
              pat_id: patient,
            },
          })
          .then((response) => {
            setfriends(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
          
      }else if (storedData1!=null){
        
        alert("User registered successfully");
        let parseduser;
        if (storedData1) {
          parseduser = JSON.parse(storedData1);
        }
        const doctor = parseduser[0].id_doctor;
        axios
          .get(`${API_URL}/friendsOfpatdoc`, {
            params: {
              friend_doc_id: doctor,
            },
          })
          .then((response) => {
            setfriends(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      }else if (storedData2!=null){
        
        alert("User registered successfully");
        let parseduser;
        if (storedData2) {
          parseduser = JSON.parse(storedData2);
        }
        const lab = parseduser[0].id_lab;
        axios
          .get(`${API_URL}/friendsOfpatlab`, {
            params: {
              friend_lab_id: lab,
            },
          })
          .then((response) => {
            setfriends(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      }else if (storedData3!=null){
        
        alert("User registered successfully");
        let parseduser;
        if (storedData3) {
          parseduser = JSON.parse(storedData3);
        }
        const pharm = parseduser[0].id_pharmacy;
        axios
          .get(`${API_URL}/friendsOfpatpharm`, {
            params: {
              friend_pharm_id: pharm,
            },
          })
          .then((response) => {
            setfriends(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      }
    };
    hundelfetchfriends();
  }, []); */

  const [friends, setFriends] = useState([]);

  const fetchAndSetFriends = async (endpoint, params) => {
    try {
      const response = await axios.get(endpoint, { params });
      setFriends((prevFriends) => [...prevFriends, ...response.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    const fetchUserFriends = async (userKey, userType, params) => {
      const storedData = await AsyncStorage.getItem(userKey);
  
      if (storedData) {
        alert("User registered successfully");
  
        const parsedUser = JSON.parse(storedData);
  
        if (userType === "patient") {
          const patient = parsedUser[0].id;
          await Promise.all([
            fetchAndSetFriends(`${API_URL}/friendsOfDoc`, { pat_id: patient }),
            fetchAndSetFriends(`${API_URL}/friendsOfLab`, { pat_id: patient }),
            fetchAndSetFriends(`${API_URL}/friendsOfPharm`, { pat_id: patient }),
          ]);
        } else if (userType === "doctor") {
          const doctor = parsedUser[0].id;
          await fetchAndSetFriends(`${API_URL}/friendsOfpatdoc`, { friend_doc_id: doctor });
        } else if (userType === "lab") {
          const lab = parsedUser[0].id;
          await fetchAndSetFriends(`${API_URL}/friendsOfpatlab`, { friend_lab_id: lab });
        } else if (userType === "pharmacy") {
          const pharm = parsedUser[0].id;
          await fetchAndSetFriends(`${API_URL}/friendsOfpatpharm`, { friend_pharm_id: pharm });
        }
      }
    };
  
    const userTypes = [
      { key: "patient", type: "patient", params: {} },
      { key: "doctor", type: "doctor", params: {} },
      { key: "pharmacy", type: "pharmacy", params: {} },
      { key: "lab", type: "lab", params: {} },
    ];
  
    (async () => {
      for (const userTypeData of userTypes) {
        await fetchUserFriends(userTypeData.key, userTypeData.type, userTypeData.params);
      }
    })();
  }, []);


  /* const [friends, setFriends] = useState([]);

useEffect(() => {
  const handleFetchFriends = async () => {
    const storedData1 = await AsyncStorage.getItem("doctor");
    const storedData = await AsyncStorage.getItem("patient");
    const storedData2 = await AsyncStorage.getItem("pharmacy");
    const storedData3 = await AsyncStorage.getItem("lab");

    alert("User registered successfully");

    if (storedData == null) {
      let parsedUser = JSON.parse(storedData);
      const patient = parsedUser[0].id;

      try {
        const [docResponse, labResponse, pharmResponse] = await Promise.all([
          axios.get(`${API_URL}/friendsOfDoc`, { params: { pat_id: patient } }),
          axios.get(`${API_URL}/friendsOfLab`, { params: { pat_id: patient } }),
          axios.get(`${API_URL}/friendsOfPharm`, { params: { pat_id: patient } }),
        ]);

        const combinedData = [
          ...docResponse.data,
          ...labResponse.data,
          ...pharmResponse.data,
        ];
        setFriends(combinedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else if (storedData1 !== null) {
      let parsedUser = JSON.parse(storedData1);
      const doctor = parsedUser[0].id;

      try {
        const response = await axios.get(`${API_URL}/friendsOfpatdoc`, {
          params: { friend_doc_id: doctor },
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else if (storedData2 !== null) {
      let parsedUser = JSON.parse(storedData2);
      const lab = parsedUser[0].id;

      try {
        const response = await axios.get(`${API_URL}/friendsOfpatlab`, {
          params: { friend_lab_id: lab },
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else if (storedData3 !== null) {
      let parsedUser = JSON.parse(storedData3);
      const pharm = parsedUser[0].id;

      try {
        const response = await axios.get(`${API_URL}/friendsOfpatpharm`, {
          params: { friend_pharm_id: pharm },
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  handleFetchFriends();
}, []); */


  const renderDoctor = ({ item }) => (
    <Pressable
      style={styles.cchat}
      onPress={() => navigation.navigate("ChatScreen", { user: item })}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="person-circle-outline"
          size={65}
          color="#A5DEF1"
          style={styles.cavatar}
        />
        <Text style={styles.user}>{item.username}</Text>
      </View>
    </Pressable>
  );

  // Fetch the list of friends of doctors from the API

  return (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.title}>Chats</Text>
      <FlatList 
        data={friends}
        keyExtractor={friends.email}
        renderItem={renderDoctor}
      />
    </ScrollView>
  );
}

/* function PeopleList({ navigation }) {
  return (
    <ScrollView style={styles.pageContainer}>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CustomRow
            user={item}
            onPress={() => navigation.navigate("ChatScreen", { user: item })}
          />
        )}
      />
    </ScrollView>
  );
} */

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    //
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
   
    color:'#45B3CB',
    marginRight: 16,
    padding:25,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  user: {
    fontSize: 18,
    fontWeight: "bold",
  },
  circleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: "#aeccc6",
  },
  userInfo: {
    flex: 1,
  },
  messageInfo: {
    alignItems: "flex-end",
  },
  cchat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
  },
});

export default PeopleList;
