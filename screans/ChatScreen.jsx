import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
const API_URL = "http://localhost:3000";

function ChatScreen({ route }) {
  const [userr, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { user } = route.params;

  useEffect(() => {
    getUsername();
    getmessage();
  }, [message]);

  const getUsername = async () => {
    try {
      const keys = ["doctor", "patient", "pharmacy", "lab"];
      for (const key of keys) {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData !== null) {
          setUser(JSON.parse(storedData));
          break; // Stop searching once a valid user is found
        }
      }
    } catch (e) {
      console.error("Error while loading username!", e);
    }
  };

  const MessageComponent = ({ item }) => {
    
    const status = item.sender !== userr[0].email;

    return (
      <View>
        <View
          style={
            status
              ? styles.mmessageWrapper
              : [styles.mmessageWrapper, { alignItems: "flex-end" }]
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="person-circle-outline"
              size={30}
              color="#A5DEF1"
              style={styles.mavatar}
            />
            <View
              style={
                status
                  ? styles.mmessage
                  : [styles.mmessage, { backgroundColor: "#45B3CB" }]
              }
            >
              <Text>{item.message}</Text>
            </View>
          </View>
          <Text style={{ marginLeft: 40 }}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  const getmessage = async () => {
    try {
      const keys = ["doctor", "patient", "pharmacy", "lab"];
      for (const key of keys) {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData !== null) {
          const parseduser = JSON.parse(storedData);
          const patient = parseduser[0].email;

          const response = await axios.get(`${API_URL}/getmessage`, {
            params: {
              sender: patient,
              receiver: user.email,
            },
          });
          setMessages(response.data);
          break; // Stop searching once a valid user is found
        }
      }
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const keys = ["doctor", "patient", "pharmacy", "lab"];
      for (const key of keys) {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData !== null) {
          const parseduser = JSON.parse(storedData);
          const patient = parseduser[0].email;

          await axios.post(`${API_URL}/message`, {
            sender: patient,
            receiver: user.email,
            message,
          });

          setMessage("");
          alert("Message sent successfully.");

          setMessages([...messages, { message, isImage: false }]);
          setMessage("");
          break; // Stop searching once a valid user is found
        }
      }
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  /* const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access image library denied");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginTop: 20 }}
          />
        )}
      </View>
    );
  }; */

  /*  const renderMessage = (message, index) => {
    if (message.isImage) {
      return (
        <Image
          key={index}
          source={{ uri: message.text }}
          style={styles.imageMessage}
        />
      );
    } else {
      return (
        <View key={index} style={styles.textMessageContainer}>
          <Text style={styles.textMessage}>{message.text}</Text>
        </View>
      );
    }
  }; */

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user.username}</Text>
      <View style={styles.horizontalLine} />

      <View style={styles.messageContainer}>
        {messages[0] ? (
          <FlatList
            data={messages}
            renderItem={({ item }) => <MessageComponent item={item} />}
            keyExtractor={messages.id}
          />
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Type a message..."
          value={message}
          onChangeText={(message) => setMessage(message)}
        />
        {/* <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialIcons
            name={"send"}
            style={styles.sendButtonText}
            size={30}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  uploadButton: {
    backgroundColor: "#45B3CB",
    borderRadius: 50,
    width: "15%",
    marginRight: 8,
  },
  uploadButtonText: {
    color: "white",
    padding: 8,
    textAlign: "center",
  },
  sendButton: {
    backgroundColor: "#45B3CB",
    borderRadius: 25,
    width: "15%",
  },
  sendButtonText: {
    color: "white",
    padding: 8,
    textAlign: "center",
  },
  messageContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  textMessageContainer: {
    backgroundColor: "#45B3CB",
    borderRadius: 8,
    maxWidth: "70%",
    alignSelf: "flex-end",
    marginVertical: 4,
  },
  textMessage: {
    color: "white",
    padding: 8,
  },
  imageMessage: {
    width: 200,
    height: 200,
    alignSelf: "flex-end",
    marginVertical: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "gray",
    padding: 8,
  },
  inputField: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: "80%",
    backgroundColor: "#CFECEC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 2,
  },
  mvatar: {
    marginRight: 5,
  },
});

export default ChatScreen;
