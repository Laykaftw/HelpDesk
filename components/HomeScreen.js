import { StyleSheet, View, useWindowDimensions, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import call from 'react-native-phone-call';
import * as SMS from 'expo-sms';
import { Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.setItem('@viewedOnboarding','false');
            console.log('cleared');
        } catch (error) {
            console.log('Error removing onboarding data');
        }
    };


    const { width } = useWindowDimensions();

    // const [authenticationStatus, setAuthenticationStatus] = useState(null);
    // const [icon, setIcon] = useState('fingerprint');

    // const authenticate = async () => {
    //     try {
    //         const result = await LocalAuthentication.authenticateAsync();
    //         if (result.success) {
    //             setAuthenticationStatus('Authenticated');
    //             setIcon('fingerprint');
    //         } else {
    //             setAuthenticationStatus('Authentication failed!');
    //             setIcon('fingerprint-off');
    //         }
    //     } catch (error) {
    //         console.error('Authentication error:', error);
    //         setAuthenticationStatus('Authentication error');
    //     }
    // };

    const Call = () => {
        const args = {
            number: '94956426',
            prompt: true,
        };
        call(args).catch(console.error);
    };

    const [isAvailable, setIsAvailable] = useState(false);
    const [isMailAvailable, setIsMailAvailable] = useState(false);
    const [isCallAvailable, setIsCallAvailable] = useState(false);

    useEffect(() => {
        async function checkMailAvailability() {
            const isMavailable = await SMS.isAvailableAsync();
            setIsMailAvailable(isMavailable);
        }

        async function checkCallAvailability() {
            Linking.canOpenURL('tel:+123456789').then((isCavailable) => {
                setIsCallAvailable(isCavailable);
            });
        }

        async function checkSMSAvailability() {
            const isSMSavailable = await SMS.isAvailableAsync();
            setIsAvailable(isSMSavailable);
        }

        checkMailAvailability();
        checkSMSAvailability();
        checkCallAvailability();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containers}>
                {isCallAvailable ? (
                    <Button
                        icon="phone"
                        onPress={Call}
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    >
                        Call Us
                    </Button>
                ) : (
                    <Button
                        icon="phone-cancel"
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    >
                        Call Not Available
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                {isAvailable ? (
                    <Button
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                        onPress={() => navigation.navigate('SMS')}
                        icon="message"
                    >
                        Send SMS
                    </Button>
                ) : (
                    <Button
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                        icon="message-alert"
                    >
                        Send SMS
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                {isMailAvailable ? (
                    <Button
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                        icon="email-edit"
                        onPress={() => navigation.navigate('Email')}
                    >
                        Send Email
                    </Button>
                ) : (
                    <Button
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                        icon="email-remove"
                    >
                        Email Not Available
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                <Button
                    style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    icon="help-box"
                    onPress={() => navigation.navigate('Onboarding')}
                >
                    Onboarding
                </Button>
            </View>
            <View style={styles.containers}>
                <Button
                    style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    icon="block-helper"
                    onPress={clearOnboarding}
                >
                    Clear Onboarding
                </Button>
            </View>
            {/* <View style={styles.containers}>
                <Button
                    style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    icon={icon}
                    onPress={authenticate}
                    disabled={authenticationStatus === 'Authenticated'}
                >
                    {authenticationStatus || 'Tap here to Authenticate'}
                </Button>
            </View> */}
            <View style={styles.containers}>
                <Button
                    style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    icon="block-helper"
                    onPress={()=>{
                        navigation.navigate("Authentification")
                    }}
                >
                    Clear Authentication
                </Button>
            </View>
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
    containers: {
        justifyContent: 'center',
        height: 40,
        margin: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
})