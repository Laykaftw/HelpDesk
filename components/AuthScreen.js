import { StyleSheet, View, useWindowDimensions, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { Button } from 'react-native-paper';
import * as LocalAuthentication from 'expo-local-authentication';

const AuthScreen = ({ navigation }) => {
    const [authenticationStatus, setAuthenticationStatus] = useState(null);
    const [icon, setIcon] = useState('fingerprint');
    const { width } = useWindowDimensions();

    const ClearAuth = useCallback(async () => {
        try {
            setAuthenticationStatus(null);
            setIcon('fingerprint');
            console.log('Auth Reset');
        } catch (error) {
            console.log('Error removing Auth data');
        }
    }, []);

    const authenticate = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync();
            if (result.success) {
                setAuthenticationStatus('Authenticated');
                setIcon('fingerprint');
                Alert.alert(
                    'Onboarding Preference',
                    'Do you want to see the onboarding slides?',
                    [
                        {
                            text: 'No',
                            onPress: async () => {
                                navigation.navigate('Home');
                            },
                            style: 'cancel',
                        },
                        {
                            text: 'Yes',
                            onPress: async () => {
                                navigation.navigate('Onboarding');
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                setAuthenticationStatus('Authentication failed!');
                setIcon('fingerprint-off');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setAuthenticationStatus('Authentication error');
        }
    };

    useFocusEffect(
        useCallback(() => {
            ClearAuth();
        }, [ClearAuth])
    );

    return (
        <View style={styles.container}>
            <View>
                {authenticationStatus === null || authenticationStatus === 'Authenticated' ? (
                    <Image
                        source={require('../assets/Happy.png')}
                        style={[styles.image, { width, resizeMode: 'contain' }]}
                    />
                ) : (
                    <Image
                        source={require('../assets/Sad.png')}
                        style={[styles.image, { width, resizeMode: 'contain' }]}
                    />
                )}
            </View>
            <View style={styles.containers}>
                <Button
                    textColor='white'
                    style={{ width: width - 30, backgroundColor: '#367CFF' }}
                    icon={icon}
                    onPress={authenticate}
                    disabled={authenticationStatus === 'Authenticated'}
                >
                    {authenticationStatus || 'Tap here to Authenticate'}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    containers: {
        height: 40,
        margin: 20,
    },
    image: {
        flex: 0.7,
    },
});

export default AuthScreen;
