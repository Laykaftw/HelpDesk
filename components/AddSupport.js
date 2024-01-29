import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { addSupport } from './DataBase';

const AddSupport = () => {
    const [name, setname] =useState('')
    const [phone, setphone] =useState('')
    const [email, setemail] =useState('')
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Company Name'
                value={name}
                onChangeText={(text) => setname(text)}
            />
            <TextInput
                inputMode='tel'
                style={styles.input}
                placeholder='Phone Number'
                value={phone}
                onChangeText={(text) => setphone(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={(text) => setemail(text)}
            />
            <Button onPress={addSupport(name,phone,email)}>Add</Button>
        </View>
    )
}

export default AddSupport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input :{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        margin: 20,
        padding: 10,
        width: '90%',
        height: 55,
        backgroundColor: 'white'
    }
})