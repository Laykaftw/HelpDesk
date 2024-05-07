import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { getSelectedEmail, addEmailToHistory } from './DataBase';
import { SelectList } from 'react-native-dropdown-select-list';
import * as MailComposer from 'expo-mail-composer'

const SendEmail = ({ navigation, route }) => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [recipient, setRecipient] = useState('');
    const { width } = useWindowDimensions()
    const [selected, setSelected] = useState("");

    useEffect(() => {
        if (route.params && route.params.id) {
            getSelectedEmail(route.params.id, handleEmail);
        }
    }, [route.params]);

    const handleEmail = (selectedEmail) => {
        if (selectedEmail) {
            // Set the recipient state with the retrieved email
            setRecipient(selectedEmail);
        } else {
            // Handle the case where no email is found for the selected ID
            console.error('No email found for the selected ID.');
        }
    };
    const data = [
        { key: '1', value: 'Complaint' },
        { key: '2', value: 'Assistance' },
        { key: '3', value: 'Suggestions' },
    ]

    const handleSendEmail = () => {
        MailComposer.composeAsync({
            subject: subject,
            body: "Category : " + selected + "\n\n" + body,
            recipients: [recipient]
        }).then(result => {
            console.log(result)
            if (result.status === 'sent') {
                // If the email is sent successfully, add it to the history
                addEmailToHistory(subject, body);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Write your subject here'
                value={subject}
                onChangeText={(text) => setSubject(text)}
            />
            <SelectList
                placeholder='Select a Category'
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                zIndex={3000}
                boxStyles={{ margin: 20, padding: 10, borderColor: '#367CFF', borderRadius: 15, width: width - 78, alignItems: 'center' }}
                dropdownStyles={{ borderColor: '#367CFF', height: 120, width: width - 80 }}
                inputStyles={{ color: '#367CFF' }}
                dropdownTextStyles={{ color: '#367CFF' }}
            >
            </SelectList>
            <TextInput
                style={styles.email}
                placeholder='Describe your problem'
                value={body}
                onChangeText={(text) => setBody(text)}
            />
            <Button textColor='white' onPress={handleSendEmail} style={styles.button}>Send</Button>
            <View >
                <Button textColor='white' icon={'history'} onPress={() => navigation.navigate('History')} style={styles.button}>History</Button>
            </View>
        </View>
    );
};

export default SendEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#367CFF',
        borderWidth: 1,
        borderRadius: 15,
        margin: 20,
        padding: 10,
        width: '90%',
        height: 55,
        backgroundColor: 'white'
    },
    email: {
        height: 40,
        borderColor: '#367CFF',
        borderWidth: 1,
        borderRadius: 15,
        margin: 20,
        padding: 10,
        width: '90%',
        height: 155,
        backgroundColor: 'white'
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

