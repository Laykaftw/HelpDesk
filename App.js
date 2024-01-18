import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./components/Onboarding";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./components/HomeScreen";

const LoadingIndicator = () => {
  return (
    <View>
      <ActivityIndicator size='large' />
    </View>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log('Error @ CheckOnboarding: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingIndicator /> : viewedOnboarding ? <HomeScreen /> : <Onboarding />}
      <StatusBar style="auto" />
    </View>
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
