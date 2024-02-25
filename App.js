import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Screens/HomeScreen";
import Onboarding from "./Screens/Onboarding";
import SendSMS from "./Screens/SendSMS";
import SendEmail from "./Screens/SendEmail";
import AuthScreen from "./Screens/AuthScreen";
import AddSupport from "./Screens/AddSupport";
import AdminLog from "./Screens/AdminLog";
import History from "./Screens/History";
import ManageSupport from "./Screens/ManageSupport";
import UpdateSupport from "./Screens/UpdateSupport";

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

