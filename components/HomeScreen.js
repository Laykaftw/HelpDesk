import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import call from 'react-native-phone-call';
import * as SMS from 'expo-sms';

export default function HomeScreen({ navigation }) {
    // const clearOnboarding = async () => {
    //     try {
    //         await AsyncStorage.removeItem('@viewedOnboarding');
    //         console.log('cleared');
    //     } catch (error) {
    //         console.log('Error removing onboarding data');
    //     }
    // };

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
    const Call =()=>{
        const args ={
            number:'94956426',
            prompt:true,
        };
        call(args).catch(console.error)
    }
    // useEffect(() => {
    //     // Uncomment the following line if you want to authenticate on app start
    //     // authenticate();
    // }, []);
    const [isAvailable, setIsAvailable] = useState(false);
    const [isMailAvailable, setIsMailAvailable] = useState(false);
    useEffect(async () => {
        const isMavailable = await SMS.isAvailableAsync()
        setIsMailAvailable(isMavailable)
        const isSMSavailable = await SMS.isAvailableAsync()
        setIsAvailable(isSMSavailable)
    }, []);
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={Call}>
                <Text>Call</Text>
            </TouchableOpacity>
            {isAvailable ? <Button title='Send SMS' onPress={()=>{navigation.navigate('SMS')}}/> : <Text>SMS not available</Text>}
            {isMailAvailable ? <Button title='Send Email' onPress={()=>{navigation.navigate('Email')}}/> : <Text>Email not available</Text>}
            {/* <Text>HomeScreen</Text>
            <TouchableOpacity onPress={clearOnboarding}>
                <Text>Clear Onboarding</Text>
            </TouchableOpacity>
            <Button style={styles.Button} title='Onboarding' onPress={() => navigation.navigate("Onboarding")} />

            {authenticationStatus ? (
                <Text>{authenticationStatus}</Text>
            ) : (
                <Button style={styles.button} title="Tap here to authenticate" onPress={authenticate} />
            )} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6C63FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
