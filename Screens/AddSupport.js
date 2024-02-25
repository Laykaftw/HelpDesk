import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { addSupport } from '../components/DataBase';

// Define the AddSupport component
const AddSupport = ({ navigation }) => {
    // Define state variables for name, phone, and email
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // Function to handle adding support
    const handleAddSupport = () => {
        // Check if any field is empty
        if (!name || !phone || !email) {
            Alert.alert('Missing Information', 'Please fill in all fields.');
            return;
        }

        // Call the addSupport function from the database component
        addSupport(name, phone, email);

        // Clear the input fields
        setName('');
        setPhone('');
        setEmail('');

        // Navigate to the 'Manage Support' screen
        navigation.navigate('Manage Support');
    };

    // Render the AddSupport component
    return (
        <View style={styles.container}>
            {/* Input field for department name */}
            <TextInput
                style={styles.input}
                placeholder='Department Name'
                value={name}
                onChangeText={(text) => setName(text)}
            />

            {/* Input field for phone number */}
            <TextInput
                style={styles.input}
                placeholder='Phone Number'
                keyboardType='phone-pad'
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />

            {/* Input field for email */}
            <TextInput
                style={styles.input}
                placeholder='Email'
                keyboardType='email-address'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            {/* Button to add support */}
            <Button textColor='white' style={styles.button} onPress={handleAddSupport}>Add</Button>
        </View>
    );
};

export default AddSupport;

// Styles for the AddSupport component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
