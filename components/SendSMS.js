import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as SMS from 'expo-sms';

const SendSMS = () => {
    const [message, setMessage] = useState('');

    const sendSMS = async () => {
        const { result } = await SMS.sendSMSAsync('94956426', message);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Write your message here'
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <Button title='Send My message' onPress={sendSMS} />
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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 20,
        padding: 10,
        width: '100%',
        height: 55,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#F4338F', // Set the button background color
        color: '#fff', // Set the button text color
    },
});

export default SendSMS;
