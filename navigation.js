import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import home from "./pages/home";
import userdetaies from "./pages/userdetaies";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen
        name="userdetaies"
        component={userdetaies}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
