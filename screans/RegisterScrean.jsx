// import React from "react";
// import { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Button,
//   TextInput,
//   Image,
//   ScrollView,
// } from "react-native";
// import ImageSign from "../components/ImageSign"; // Import the ImageSign component
// import SignButton from "../components/SignButton"; // Import the SignButton component
// import MyTextInput from "../components/TextInput";
// import { useNavigation } from "@react-navigation/native";
// import LoginScrean from "./LoginScrean";
// import axios from "axios";
// import * as ImagePicker from "expo-image-picker";

// const API_URL = "http://localhost:3000";
// const RegisterScrean = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [image, setImage] = useState(null);

//   const navigation = useNavigation();

 
//   const handleSignUp = async () => {
//     try {
//       await axios.post(`${API_URL}/patient/signup`, { username, password, email });
//       alert("User registered successfully");
  
     
  
//       // Use navigation to navigate to the home page
//       navigation.navigate('Home');
//     } catch (error) {
//       console.log(error);
//       alert("Failed to register user");
//     }
//   };
//   const handleImageUpload = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       alert("Permission to access image library denied");
//       return;
//     }

//     const imageResult = await ImagePicker.launchImageLibraryAsync();
//     if (!imageResult.canceled) {
//       const formData = new FormData();
//       formData.append("image", {
//         uri: imageResult.uri,
//         name: "image.jpg",
//         type: "image/jpg",
//       });
//       formData.append("username", username);

//       try {
//         await axios.post(`${API_URL}/patient/upload`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         alert("Image uploaded successfully");
//         setImage(imageResult.uri);
//       } catch (error) {
//         console.log(error);
//         alert("Failed to upload image");
//       }
//     }
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {/* You can customize the ImageSign component with your desired props */}
//         <Text style={styles.laball}>
//           <Text style={styles.textt}>S</Text>ign{" "}
//           <Text style={styles.textt}>U</Text>p{" "}
//           <Text style={styles.textt}>A</Text>s{" "}
//           <Text style={styles.textt}>P</Text>atient
//         </Text>
//         <ImageSign
//           src={require("../assets/d.png")} // Provide the image source
//           style={{ marginBottom: 20 }} // Add any additional styles
//         />
//         {/* TextInput for username and password input */}
//         <MyTextInput
//           style={styles.input}
//           placeholder="Email"
//           icon="envelope"
//           value={email}
//           onchange={setEmail}
//         />
//         <MyTextInput
//           style={styles.input}
//           placeholder="Username"
//           icon="user"
//           value={username}
//           onchange={setUsername}
//         />
//         <MyTextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry // To hide the entered text
//           icon="lock"
//           value={password}
//           onchange={setPassword}
//         />
//         <MyTextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           secureTextEntry // To hide the entered text
//           icon="lock"
//           value={password}
//           onchange={setPassword}
//         />
      
//         <SignButton text="Sign Up" onPress={handleSignUp} />
//         <Text style={styles.text}>
//           {" "}
//           have an account !
//           <TouchableOpacity
//             onPress={() => navigation.navigate("login", LoginScrean)}
//           >
//             <Text style={styles.textt}> Sign in</Text>
//           </TouchableOpacity>
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderWidth: 1,
//     borderColor: "gray",
//     marginBottom: 10,
//     padding: 15,
//   },
//   laball: {
//     marginBottom: 20,
//     fontWeight: "600",
//   },
//   text: {
//     margin: 10,
//   },
//   textt: {
//     color: "#FF8c00",
//     fontWeight: "600",
//   },
// });

// export default RegisterScrean;
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MyTextInput from "../components/TextInput";
import SignButton from "../components/SignButton";
import ImageSign from "../components/ImageSign";
import { useNavigation } from "@react-navigation/native";
import LoginScrean from "./LoginScrean";
import axios from "axios";

const API_URL = "http://localhost:3000";

const RegisterScrean = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const isEmailValid = (email) => {
    // Gmail-like email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Password strength validation (example criteria: at least 8 characters, one uppercase, one lowercase, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    // Basic validation
    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (!isEmailValid(email)) {
      alert("Please enter a valid Gmail address");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isPasswordValid(password)) {
      alert("Password must be at least 8 characters long and include one uppercase, one lowercase, and one special character");
      return;
    }

    try {
      await axios.post(`${API_URL}/patient/signup`, { username, password, email });
      alert("User registered successfully");

      // Use navigation to navigate to the home page
      navigation.navigate('login');
    } catch (error) {
      console.log(error);
      alert("Failed to register user");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>
          Sign Up As Patient
        </Text>
        <ImageSign
          src={require("../assets/d.png")}
          style={{ marginBottom: 20 }}
        />
        <MyTextInput
          style={styles.input}
          placeholder="Email"
          icon="envelope"
          value={email}
          onchange={setEmail}
        />
        <MyTextInput
          style={styles.input}
          placeholder="Username"
          icon="user"
          value={username}
          onchange={setUsername}
        />
        <MyTextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          icon="lock"
          value={password}
          onchange={setPassword}
        />
        <MyTextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          icon="lock"
          value={confirmPassword}
          onchange={setConfirmPassword}
        />
        <SignButton text="Sign Up" onPress={handleSignUp} />
        <Text style={styles.text}>
          Already have an account?
          <TouchableOpacity
            onPress={() => navigation.navigate("login", LoginScrean)}
          >
            <Text style={styles.textLink}> Sign in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 15,
  },
  label: {
    marginBottom: 20,
    fontWeight: "600",
    fontSize: 18,
  },
  text: {
    margin: 10,
  },
  textLink: {
    color: "#FF8c00",
    fontWeight: "600",
  },
});

export default RegisterScrean;
