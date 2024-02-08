import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet,  Alert } from 'react-native';
import { getSelectedSupport, updateSupport } from './DataBase';
import { Button } from 'react-native-paper';

const UpdateScreen = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function fetchSupportDetails() {
            const supportDetails = await getSelectedSupport(route.params.id);
            setName(supportDetails.Name);
            setPhone(supportDetails.Phone);
            setEmail(supportDetails.Email);
        }
        fetchSupportDetails();
    }, [route.params.id]);

    const handleUpdate = async () => {
        try {
            await updateSupport(route.params.id, name, phone, email);
            Alert.alert('Update Successful', 'Department information updated successfully.');
            navigation.navigate('Manage Support');
        } catch (error) {
            console.error('Error updating department:', error);
            Alert.alert('Update Failed', 'An error occurred while updating department information. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Department Name'
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder='Phone Number'
                keyboardType='number-pad'
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />
            <Button textColor='white' icon={'update'} onPress={handleUpdate} style={styles.button}>Update</Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    input: {
        height: 40,
        width: '80%',
        marginVertical: 10,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
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

export default UpdateScreen;
