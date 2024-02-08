import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { getEmailHistory, resetHistory } from './DataBase';
import { Button } from 'react-native-paper';

const History = () => {
    const { width } = useWindowDimensions();
    const [emailHistory, setEmailHistory] = useState([]);

    const refreshHistory = () => {
        getEmailHistory(setEmailHistory);
    };

    useEffect(() => {
        // Retrieve email history when component mounts
        getEmailHistory(setEmailHistory);
    }, []);

    const handleResetHistory = () => {
        resetHistory();
        refreshHistory(); // Refresh history after reset
    };

    return (
        <View style={styles.container}>
            <View style={[styles.history, { width: width - 20 }]}>
                <Text style={styles.title}>Email History</Text>
                {emailHistory.map((email, index) => (
                    <View key={index} style={styles.emailContainer}>
                        <Text style={styles.subject}>{email.subject}</Text>
                        <Text style={styles.body}>{email.body}</Text>
                        <Text style={styles.timestamp}>{email.timestamp}</Text>
                    </View>
                ))}
            </View>
            <Button textColor='#367CFF' icon={'delete-empty'} onPress={handleResetHistory} style={{padding:10,width:200,marginTop:20,borderColor:'#367CFF',borderWidth:1,backgroundColor:'white'}}>Reset History</Button>
        </View>
    );
};

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#367CFF',
    },
    history: {
        flex: 0.8,
        padding: 20,
        backgroundColor: '#EAEAEA',
        borderRadius: 20,
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#367CFF'
    },
    emailContainer: {
        marginBottom: 20,
    },
    subject: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    body: {
        fontSize: 14,
        marginBottom: 5,
    },
    timestamp: {
        fontSize: 12,
        color: 'gray',
    },
});
