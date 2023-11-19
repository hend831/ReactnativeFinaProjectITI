
// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Image,
//   TextInput,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import ImageSign from "../components/ImageSign"; // Import the ImageSign component
// import SignButton from "../components/SignButton"; // Import the SignButton component
// import MyTextInput from "../components/TextInput";
// import RegisterAs from "./RegisterAs";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import axios from "axios";

// const API_URL = "http://localhost:3000";

// const LoginScrean = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const storeUserData = async (userType, userr) => {
//     try {
//       if (!userType || !userr) {
//         throw new Error("Invalid user type or user data");
//       }

//       const key = `${userType}`; // Create a key based on user type
//       await AsyncStorage.setItem(key, JSON.stringify(userr));
//       console.log(`User data for ${userType} stored successfully`);
//     } catch (error) {
//       console.error("Error while storing user data:", error);
//       // You can throw the error if needed or return an error status
//       // throw error;
//       // return false;
//     }
//   };

//   const handleSignIn = async () => {
//     //AsyncStorage.clear();
//     const userTypes = ["patient", "doctor", "lab", "pharmacy"];
//     let isSignedIn = false;

//     for (const userType of userTypes) {
//       try {
//         const response = await axios.post(`${API_URL}/${userType}/signin`, {
//           username,
//           password,
//         });

//         alert("User signed in successfully");

//         const user = response.data;

//         storeUserData(userType, user);

//         navigation.navigate("Home");
//         isSignedIn = true;
//         break; // Break the loop when a user is successfully signed in
//       } catch (error) {
//         // Handle errors for each user type separately if needed
//       }
//     }

//     if (!isSignedIn) {
//       console.log("Invalid credentials");
//       alert("Invalid credentials");
//     }
//   };
//   return (
//     <View style={styles.container}>
//       {/* You can customize the ImageSign component with your desired props */}
//       <ImageSign
//         src={require("../assets/d.png")} // Provide the image source
//         style={{ marginBottom: 20 }} // Add any additional styles
//       />

//       {/* TextInput for username and password input */}
//       <MyTextInput
//         style={styles.input}
//         placeholder="Email or User Name"
//         icon="envelope"
//         value={username}
//         onchange={setUsername}
//       />

//       <MyTextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry // To hide the entered text
//         icon="lock"
//         value={password}
//         onchange={setPassword}
//       />

//       {/* Sign in button */}
//       <SignButton text="Sign In" onPress={handleSignIn} />
//       <Text style={styles.text}>
//         don't have an account yet?
//         <TouchableOpacity
//           onPress={() => navigation.navigate("register_As", RegisterAs)}
//         >
//           <Text style={styles.textt}>Register Now</Text>
//         </TouchableOpacity>
//       </Text>
//       {/* You can add more components or elements as needed */}
//     </View>
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
//   text: {
//     margin: 10,
//   },
//   textt: {
//     color: "#FF8c00",
//     fontWeight: "600",
//   },
// });

// export default LoginScrean;
// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Image,
//   TextInput,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import ImageSign from "../components/ImageSign"; // Import the ImageSign component
// import SignButton from "../components/SignButton"; // Import the SignButton component
// import MyTextInput from "../components/TextInput";
// import RegisterAs from "./RegisterAs";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import axios from "axios";

// const API_URL = "http://localhost:3000";

// const LoginScrean = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const storeUserData = async (userType, userr) => {
//     try {
//       if (!userType || !userr) {
//         throw new Error("Invalid user type or user data");
//       }

//       const key = `${userType}`; // Create a key based on user type
//       await AsyncStorage.setItem(key, JSON.stringify(userr));
//       console.log(`User data for ${userType} stored successfully`);
//     } catch (error) {
//       console.error("Error while storing user data:", error);
//       // You can throw the error if needed or return an error status
//       // throw error;
//       // return false;
//     }
//   };

//   const handleSignIn = async () => {
//     AsyncStorage.clear();
//     const userTypes = ["patient", "doctor", "lab", "pharmacy"];
//     let isSignedIn = false;

//     for (const userType of userTypes) {
//       try {
//         const response = await axios.post(`${API_URL}/${userType}/signin`, {
//           username,
//           password,
//         });

//         alert("User signed in successfully");

//         const user = response.data;

//         storeUserData(userType, user);

//         navigation.navigate("Home");
//         isSignedIn = true;
//         break; // Break the loop when a user is successfully signed in
//       } catch (error) {
//         // Handle errors for each user type separately if needed
//       }
//     }

//     if (!isSignedIn) {
//       console.log("Invalid credentials");
//       alert("Invalid credentials");
//     }
//   };
//   return (
//     <View style={styles.container}>
//       {/* You can customize the ImageSign component with your desired props */}
//       <ImageSign
//         src={require("../assets/d.png")} // Provide the image source
//         style={{ marginBottom: 20 }} // Add any additional styles
//       />

//       {/* TextInput for username and password input */}
//       <MyTextInput
//         style={styles.input}
//         placeholder="Email or User Name"
//         icon="envelope"
//         value={username}
//         onchange={setUsername}
//       />

//       <MyTextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry // To hide the entered text
//         icon="lock"
//         value={password}
//         onchange={setPassword}
//       />

//       {/* Sign in button */}
//       <SignButton text="Sign In" onPress={handleSignIn} />
//       <Text style={styles.text}>
//         don't have an account yet?
//         <TouchableOpacity
//           onPress={() => navigation.navigate("register_As", RegisterAs)}
//         >
//           <Text style={styles.textt}>Register Now</Text>
//         </TouchableOpacity>
//       </Text>
//       {/* You can add more components or elements as needed */}
//     </View>
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
//   text: {
//     margin: 10,
//   },
//   textt: {
//     color: "#FF8c00",
//     fontWeight: "600",
//   },
// });

// export default LoginScrean;
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import ImageSign from "../components/ImageSign";
import SignButton from "../components/SignButton";
import MyTextInput from "../components/TextInput";
import RegisterAs from "./RegisterAs";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://localhost:3000";

const LoginScrean = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const storeUserData = async (userType, userr) => {
    try {
      if (!userType || !userr) {
        throw new Error("Invalid user type or user data");
      }

      const key = `${userType}`; // Create a key based on user type
      await AsyncStorage.setItem(key, JSON.stringify(userr));
      console.log(`User data for ${userType} stored successfully`);
    } catch (error) {
      console.error("Error while storing user data:", error);
    }
  };

  const handleSignIn = async () => {
    AsyncStorage.clear();
    const userTypes = ["patient", "doctor", "lab", "pharmacy"];
    let isSignedIn = false;

    // Check if username and password are admin
    if (username.toLowerCase() === "admin" && password === "admin") {
      navigation.navigate("AdminScreen"); // Navigate to AdminScreen
      return;
    }

    for (const userType of userTypes) {
      try {
        const response = await axios.post(`${API_URL}/${userType}/signin`, {
          username,
          password,
        });

        alert("User signed in successfully");

        const user = response.data;

        storeUserData(userType, user);

        navigation.navigate("Home");
        isSignedIn = true;
        break; // Break the loop when a user is successfully signed in
      } catch (error) {
        // Handle errors for each user type separately if needed
      }
    }

    if (!isSignedIn) {
      console.log("Invalid credentials");
      alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <ImageSign
        src={require("../assets/d.png")}
        style={{ marginBottom: 20 }}
      />

      <MyTextInput
        style={styles.input}
        placeholder="Email or User Name"
        icon="envelope"
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

      <SignButton text="Sign In" onPress={handleSignIn} />
      <Text style={styles.text}>
        Don't have an account yet?
        <TouchableOpacity
          onPress={() => navigation.navigate("register_As", RegisterAs)}
        >
          <Text style={styles.textt}>Register Now</Text>
        </TouchableOpacity>
      </Text>
    </View>
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
  text: {
    margin: 10,
  },
  textt: {
    color: "#FF8c00",
    fontWeight: "600",
  },
});

export default LoginScrean;
