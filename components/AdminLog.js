import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Text, TextInput } from 'react-native-paper'

const AdminLog = ({navigation}) => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [tries, setTries] = useState(0)

    const checkAdmin = (user, pass) => {
        if (user === "Admin" && pass === "1234") {
            alert("Logged in as admin!");
            navigation.navigate('Manage Support')
        } else {
            setTries(tries+1)
            if (tries >= 3) {
                alert("It seems like you are not an administrator \nRedirecting you to Home Screen.")
                navigation.navigate('Home')
                setTries(0)
            }else{
                alert("Check your username and password");
            }
        }
        setUser('');
        setPass('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You need to be an admin to add support</Text>
            <TextInput
                style={styles.input}
                placeholder='User'
                value={user}
                onChangeText={(text) => setUser(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={pass}
                onChangeText={(text) => setPass(text)}
                secureTextEntry={true}
            />
            <Button  style={{width:200,height:50,alignContent:'center'}} buttonColor='#367CFF' textColor='white' onPress={() => checkAdmin(user, pass)}>Log in</Button>
        </View>
    )
}

export default AdminLog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    text : {
        fontSize: 16,
        color:'red',
    },
})
