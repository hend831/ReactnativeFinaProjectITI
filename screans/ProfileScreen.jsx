// // ProfileScreen.js
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// const ProfileScreen = () => {
//   const [user, setUser] = useState([]);
//   const handleLogout = async () => {
//         try {
//           // Remove the "patient" item from AsyncStorage
//           await AsyncStorage.removeItem("patient");
//           // Implement any additional logout logic if needed
      
//           // Navigate to the login screen or any other screen after logout
//           // (Replace 'LoginScreen' with the actual route name)
//           navigation.navigate('LoginScreen');
//         } catch (error) {
//           console.error("Error logging out:", error);
//         }
//       };
//   useEffect(() => {
//     displayData();
//   }, []);
//   const displayData = async () => {
//     try {
//       const storedData = await AsyncStorage.getItem("patient");
//       if (storedData !== null) {
//         setUser(JSON.parse(storedData));
//         console.log(storedData.username)
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Image
//           source={require("../../New folder (11)/assets/doctor.png")}
//           style={styles.profileImage}
//         />
         
        
//         {user.map((item) => (
//           <View key={item.id_patient}>
//           <Text style={styles.userName}>Welcome:{item.username}</Text>
//           <Text style={styles.x}>
//             You are now a member of the Yall Help family.
//            </Text>
//           <Text style={styles.userDetails}>Your email:{item.email}</Text>
//           </View>
//         ))}

//         <TouchableOpacity style={styles.btn} onPress={handleLogout}>
//           <Text style={styles.txt}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 40,
//     backgroundColor:'#eeeeee',
//   },
//   x:{
    
//       fontSize: 14,
//       marginBottom: 20,
//       color:'#45B3CB',
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 20,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color:'#45B3CB',
//   },
//   userDetails: {
//     fontSize: 16,
//     marginBottom: 15,
//     color:'#ffc93c',
//   },
//   btn: {
//     backgroundColor: "#45B3CB",
//     borderRadius: 10,
//     padding: 10,
//     width: "88%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   txt: {
//     padding: 7,
//     color: "white",
//   },
// });

// export default ProfileScreen;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = () => {
  const [user, setUser] = useState([]);
  const handleLogout = async () => {
        try {
          // Remove the "patient" item from AsyncStorage
          await AsyncStorage.removeItem("patient");
          await AsyncStorage.removeItem("doctor");
          await AsyncStorage.removeItem("lab");
          await AsyncStorage.removeItem("pharmacy");
          navigation.navigate('LoginScreen');
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };
  useEffect(() => {
    displayData();
  }, []);
  const displayData = async () => {
    try {
      const keys = ["doctor", "patient", "pharmacy", "lab"];
      for (const key of keys) {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData !== null) {
          setUser(JSON.parse(storedData));
          break; // Stop searching once a valid user is found
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../New folder (11)/assets/doctor.png")}
          style={styles.profileImage}
        />
         
        
        {user.map((item) => (
          <View key={item.id }>
          <Text style={styles.userName}>Welcome:{item.username}</Text>
          <Text style={styles.x}>
            You are now a member of the Yall Help family.
           </Text>
          <Text style={styles.userDetails}>Your email:{item.email}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
          <Text style={styles.txt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor:'#eeeeee',
  },
  x:{
    
      fontSize: 14,
      marginBottom: 20,
      color:'#45B3CB',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color:'#45B3CB',
  },
  userDetails: {
    fontSize: 16,
    marginBottom: 15,
    color:'#ffc93c',
  },
  btn: {
    backgroundColor: "#45B3CB",
    borderRadius: 10,
    padding: 10,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  txt: {
    padding: 7,
    color: "white",
  },
});

export default ProfileScreen;