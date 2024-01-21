import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export default function HomeScreen({navigation}) {
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding');
            console.log('cleared');
        } catch (error) {
            console.log('Error removing onboarding data');
        }
    };

    const [authenticationStatus, setAuthenticationStatus] = useState(null);

    const authenticate = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync();
            if (result.success) {
                setAuthenticationStatus('Authentication successful!');
            } else {
                setAuthenticationStatus('Authentication failed!');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setAuthenticationStatus('Authentication error');
        }
    };

    useEffect(() => {
        // Uncomment the following line if you want to authenticate on app start
        // authenticate();
    }, []);

    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <TouchableOpacity onPress={clearOnboarding}>
                <Text>Clear Onboarding</Text>
            </TouchableOpacity>
            <Button title='Onboarding' onPress={()=> navigation.navigate("Onboarding")}  />

            {/* {authenticationStatus ? (
                <Text>{authenticationStatus}</Text>
            ) : (
                <Button title="Tap here to authenticate" onPress={authenticate} />
            )} */}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
