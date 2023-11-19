// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import Navigation from "./navigation";
// import MainScreen from "../screans/MainScrean";
// import "react-native-gesture-handler";
// import DoctorsScreen from '../screans/DoctorsScrean';
// import LoginScrean from '../screans/LoginScrean';
// import RegisterScrean from "../screans/RegisterAsDoctor";
// import Navigation from "./navigation";
// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
//         <Tab.Screen name="Home" component={Navigation}  />
//         <Tab.Screen name="logins" component={LoginScrean} />
//         <Tab.Screen name="register" component={RegisterScrean} />
//         {/* <Tab.Screen name="registerPharmacy" component={RegisterAsPharmacy} /> */}
//         {/* <Tab.Screen
//           name="registerLaporatory"
//           component={RegisterAsLaboratory}
//         /> */}
//         <Tab.Screen name="Main" component={MainScreen} />
//         <Tab.Screen name="Doctors" component={DoctorsScreen} />
//         {/* <Tab.Screen name="Chats" component={Chat} />
//         <Tab.Screen name="login" component={Login} />
//         <Tab.Screen name="Messaging" component={Messaging} /> */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default MyTabs;
// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import MyTabs from "./tabNavigation";
// import { NavigationContainer } from "@react-navigation/native";
// import LoginScrean from "../screans/LoginScrean";
// const Stack = createStackNavigator();

// const StackNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen
//           name="login"
//           component={LoginScrean}
//           options={{ headerShown: true }}
//         />
//         <Stack.Screen
//           name="Home"
//           component={MyTabs}
//           options={{ headerShown: true }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default StackNavigator;
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./tabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import LoginScrean from "../screans/LoginScrean";
import RegisterAs from "../screans/RegisterAs";
import RegisterScrean from "../screans/RegisterScrean";
import RegisterAsDoctor from "../screans/RegisterAsDoctor";
import RegisterAsPharmacy from "../screans/RegisterAsPharmacy";
import RegisterAsLaboratory from "../screans/RegisterAsLaboratory";
import DoctorsScreen from "../screans/DoctorsScrean";
import FormPage from "../screans/FormPage";
import HomeScrean from "../screans/HomeScrean";
import PeopleList from "../screans/PeopleList";
import ProfileScreen from "../screans/ProfileScreen";
import MainScrean from "../screans/MainScrean";
import AdminDashboardScreen from "../screans/AdminDashboardScreen";
import DoctorsManagement from "../screans/DoctorsManagement";
import LaboratoryManagement from "../screans/LaboratoryManagement";
import PharmacyManagement from "../screans/PharmacyManagement";
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      
    <Stack.Screen name="login" component={LoginScrean} />
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="register_As" component={RegisterAs} />
      <Stack.Screen name="register" component={RegisterScrean} />
      <Stack.Screen name="home_Screan" component={HomeScrean} />
      <Stack.Screen name="Main " component={MainScrean} />
      <Stack.Screen name="register_As_doctor" component={RegisterAsDoctor} />
      <Stack.Screen name="register_As_pharmacy" component={RegisterAsPharmacy}/>
      <Stack.Screen name="register_As_laboratory" component={RegisterAsLaboratory}/>
      <Stack.Screen name="doctors" component={DoctorsScreen} />
      <Stack.Screen name="form" component={FormPage} />
      <Stack.Screen name="peopleList" component={PeopleList} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="AdminScreen" component={AdminDashboardScreen} />
      <Stack.Screen name="DoctorsManagement" component={DoctorsManagement} />
      <Stack.Screen name="PharmcyManagement" component={PharmacyManagement} />
      <Stack.Screen name="LaboratoryManagement" component={LaboratoryManagement} />
     

    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
