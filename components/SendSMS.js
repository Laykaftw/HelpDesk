import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, useWindowDimensions } from 'react-native';
import * as SMS from 'expo-sms';
import { Button } from 'react-native-paper';
import { getSelectedPhone } from './DataBase';

const SendSMS = ({ route }) => {
    const [message, setMessage] = useState('');
    const { width } = useWindowDimensions();
    const [recipient, setRecipient] = useState('');

    useEffect(() => {
        // Fetch the phone number for the selected support ID
        if (route.params && route.params.id) {
            getSelectedPhone(route.params.id, handlePhone);
        }
    }, [route.params]);

    const handlePhone = (selectedPhone) => {
        if (selectedPhone) {
            // Set the recipient state with the retrieved phone number
            setRecipient(selectedPhone);
        } else {
            // Handle the case where no phone number is found for the selected ID
            console.error('No phone number found for the selected ID.');
        }
    };

    const sendSMS = async () => {
        const { result } = await SMS.sendSMSAsync(recipient, message);
        // Handle the result of sending the SMS if needed
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Write your message here'
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <Button buttonColor='#EAEAEA' style={styles.button} icon={'send'} onPress={sendSMS}>Send</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#6C63FF',
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 20,
        padding: 10,
        width: '90%',
        height: 55,
        backgroundColor: 'white'
    },
    button: {
        width: '60%'
    }
});

export default SendSMS;
