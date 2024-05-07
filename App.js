import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./components/HomeScreen";
import Onboarding from "./components/Onboarding";
import SendSMS from "./components/SendSMS";
import SendEmail from "./components/SendEmail";
import AuthScreen from "./components/AuthScreen";
import AddSupport from "./components/AddSupport";
import AdminLog from "./components/AdminLog";
import History from "./components/History";
import ManageSupport from "./components/ManageSupport";
import UpdateSupport from "./components/UpdateSupport";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Authentication" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SMS" component={SendSMS} />
        <Stack.Screen name="Email" component={SendEmail} />
        <Stack.Screen name="Add Support" component={AddSupport} />
        <Stack.Screen name="AdminLog" component={AdminLog} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Manage Support" component={ManageSupport} />
        <Stack.Screen name="Update Support" component={UpdateSupport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

