import { Button, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import * as MailComposer from 'expo-mail-composer'

const SendEmail = () => {
    const [subject, setsubject] = useState('');
    const [body, setbody] = useState('');

    const Mail = () => {
        MailComposer.composeAsync({
            subject: subject,
            body: body,
            recipients:'azerbensassi@gmail.com'
        })
    }
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='Write your subject here'
                value={subject}
                onChangeText={(text) => setsubject(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Describe your problem'
                value={body}
                onChangeText={(text) => setbody(text)}
            />
            <Button title='Send' onPress={Mail}/>
        </View>
    )
}

export default SendEmail

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
        margin: 20,
        padding: 10,
        width: '90%',
        height: 55,
        backgroundColor: 'white'
    },
})