import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Linking } from 'react-native';
import call from 'react-native-phone-call';
import * as SMS from 'expo-sms';
import { Button } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'; // Import SelectList
import { getSupportList, getSelectedPhone } from './DataBase';

export default function HomeScreen({ navigation }) {
    const [isCallAvailable, setIsCallAvailable] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [isMailAvailable, setIsMailAvailable] = useState(false);
    const { width } = useWindowDimensions();
    const [supportOptions, setSupportOptions] = useState([]);
    const [selectedSupport, setSelectedSupport] = useState('');
    const [recipient, setRecipient] = useState('');

    useEffect(() => {
        async function checkMailAvailability() {
            const isMavailable = await SMS.isAvailableAsync();
            setIsMailAvailable(isMavailable);
        }

        async function checkCallAvailability() {
            Linking.canOpenURL('tel:+123456789').then((isCavailable) => {
                setIsCallAvailable(isCavailable);
            });
        }

        async function checkSMSAvailability() {
            const isSMSavailable = await SMS.isAvailableAsync();
            setIsAvailable(isSMSavailable);
        }

        async function fetchSupportOptions() {
            getSupportList((supportItems) => {
                const options = supportItems.map((item) => ({
                    key: item.id.toString(),
                    value: item.Name,
                }));
                setSupportOptions(options);
            });
        }

        checkMailAvailability();
        checkSMSAvailability();
        checkCallAvailability();
        fetchSupportOptions();
    }, []);



    const handlePhone = (selectedPhone) => {
        if (selectedPhone) {
            // Set the recipient state with the retrieved phone number
            setRecipient(selectedPhone);
            // console.log('recipient :  ',recipient)
        } else {
            // Handle the case where no phone number is found for the selected ID
            console.error('No phone number found for the selected ID.');
        }
    };
    const Call = (r) => {
        console.log('recipient : ', recipient)
        const args = {
            number: r,
            prompt: true,
        };
        call(args).catch(console.error);
    };
    const HandleCall = () => {
        if (selectedSupport) {
            getSelectedPhone(selectedSupport, (selectedPhone) => {
                if (selectedPhone) {
                    Call(selectedPhone);
                } else {
                    console.error('No phone number found for the selected support.');
                }
            });
        } else {
            console.error('No support option selected.');
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={{ width: width - 30 }}>
                <SelectList
                    placeholder='Select a Support Option'
                    setSelected={(val) => setSelectedSupport(val)}
                    onSelect={(selectedId) => {
                        if (selectedId) {
                            getSelectedPhone(selectedId, handlePhone);
                        }
                    }}
                    boxStyles={{margin: 20,padding: 10,borderColor:'#6C63FF',borderRadius:15, alignItems:'center'}}
                    dropdownStyles={{borderColor:'#6C63FF'}}
                    inputStyles={{color:'#6C63FF'}}
                    data={supportOptions}
                    save="value"
                    zIndex={3000}
                    style={{ width: width - 10, backgroundColor: '#EAEAEA' }}
                />

            </View>
            <View style={styles.containers}>
                {isCallAvailable == true && selectedSupport != '' ? (
                    <Button
                        icon="phone"
                        onPress={HandleCall}
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    >
                        Call Us
                    </Button>
                ) : (
                    <Button
                        icon="phone-cancel"
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    >
                        Call Not Available
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                {isAvailable == true && selectedSupport != '' ? (
                    <Button
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                        onPress={() => navigation.navigate('SMS', { id: selectedSupport })}
                        icon="message"
                    >
                        Send SMS
                    </Button>
                ) : (
                    <Button
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                        icon="message-alert"
                    >
                        SMS not available
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                {isMailAvailable == true && selectedSupport != '' ? (
                    <Button
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                        icon="email-edit"
                        onPress={() => navigation.navigate('Email', { id: selectedSupport })}
                    >
                        Send Email
                    </Button>
                ) : (
                    <Button
                        style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                        icon="email-remove"
                    >
                        Email Not Available
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                <Button
                    style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    icon="account-off"
                    onPress={() => {
                        navigation.navigate('Authentification');
                    }}
                >
                    Log Out
                </Button>
            </View>
            <View style={styles.containers}>
                <Button
                    style={{ width: width - 30, backgroundColor: '#EAEAEA' }}
                    icon="plus-circle"
                    onPress={() => {
                        navigation.navigate('AdminLog');
                    }}
                >
                    Add New Support
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containers: {
        justifyContent: 'center',
        height: 40,
        margin: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
});
