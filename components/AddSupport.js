import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { addSupport } from './DataBase';

const AddSupport = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleAddSupport = () => {
        if (!name || !phone || !email) {
            Alert.alert('Missing Information', 'Please fill in all fields.');
            return;
        }

        addSupport(name, phone, email);
        setName('');
        setPhone('');
        setEmail('');
        navigation.navigate('Manage Support');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Department Name'
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Phone Number'
                keyboardType='phone-pad'
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                keyboardType='email-address'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Button textColor='white' style={styles.button} onPress={handleAddSupport}>Add</Button>
        </View>
    );
};

export default AddSupport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
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
        backgroundColor: 'white',
    },
    button: {
        padding: 10,
        width: 200,
        marginTop: 20,
        borderColor: '#367CFF',
        borderWidth: 1,
        backgroundColor: '#367CFF'
    }
});
