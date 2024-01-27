import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./components/HomeScreen";
import Onboarding from "./components/Onboarding";
import SendSMS from "./components/SendSMS";
import SendEmail from "./components/SendEmail";
import AuthScreen from "./components/AuthScreen";

export default function App() {
  const [viewedOnboarding, setViewedOnboarding] = useState(true);
  const Stack = createNativeStackNavigator();
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value === 'true') {
        setViewedOnboarding(true);
      } else {
        setViewedOnboarding(false);
      }
    } catch (err) {
      console.log('Error @ CheckOnboarding: ', err);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Authentification" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SMS" component={SendSMS} />
        <Stack.Screen name="Email" component={SendEmail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
