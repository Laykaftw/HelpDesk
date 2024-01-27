import {  StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import * as SMS from 'expo-sms';
import { Button, TextInput } from 'react-native-paper';

const SendSMS = () => {
    const [message, setMessage] = useState('');
    const {width}=useWindowDimensions()
    const sendSMS = async () => {
        const { result } = await SMS.sendSMSAsync('+216 94956426', message);
    };

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder='Write your message here'
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
            <Button buttonColor='#EAEAEA' style={styles.button} icon={'send'} onPress={sendSMS} >Send</Button>
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
    button:{
        width:'60%'
    }
});

export default SendSMS;
