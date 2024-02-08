import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Linking } from 'react-native';
import call from 'react-native-phone-call';
import * as SMS from 'expo-sms';
import { Button } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'; // Import SelectList
import { getSupportList, getSelectedPhone } from './DataBase';
import { useFocusEffect } from '@react-navigation/native';

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

        checkMailAvailability();
        checkSMSAvailability();
        checkCallAvailability();
    }, []);

    let options = []
    useFocusEffect(
        useCallback(() => {
            async function fetchSupportOptions() {
                // console.log('test')
                getSupportList((supportItems) => {
                    options = supportItems.map((item) => ({
                        key: item.id.toString(),
                        value: item.Name,
                    }));
                    setSupportOptions(options)
                    //  supportOptions.push(options)

                });
            }
            fetchSupportOptions();
        }, []));




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
        // console.log('recipient : ', recipient)
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
                    placeholder='Select the Department'
                    setSelected={(item) => setSelectedSupport(item)}
                    onSelect={(selectedId) => {
                        if (selectedId) {
                            console.log("selectedId", selectedId)
                            getSelectedPhone(selectedId, handlePhone);
                        }
                    }}
                    boxStyles={{ margin: 20, padding: 10, borderColor: '#367CFF', borderRadius: 15, alignItems: 'center' }}
                    dropdownStyles={{ borderColor: '#367CFF' }}
                    inputStyles={{ color: '#367CFF' }}
                    data={supportOptions}
                    zIndex={3000}
                    style={{ width: width - 10, backgroundColor: '#367CFF' }}
                />

            </View>
            <View style={styles.containers}>
                {isCallAvailable == true && selectedSupport != '' ? (
                    <Button
                        textColor='white'
                        icon="phone"
                        onPress={HandleCall}
                        style={{ width: width - 30, backgroundColor: '#367CFF' }}
                    >
                        Call Us
                    </Button>
                ) : (
                    <Button
                        textColor='white'
                        icon="phone-cancel"
                        style={{ width: width - 30, backgroundColor: '#367CFF' }}
                    >
                        Call Not Available
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                {isAvailable == true && selectedSupport != '' ? (
                    <Button
                        textColor='white'
                        style={{ width: width - 30, backgroundColor: '#367CFF' }}
                        onPress={() => navigation.navigate('SMS', { id: selectedSupport })}
                        icon="message"
                    >
                        Send SMS
                    </Button>
                ) : (
                    <Button
                        textColor='white'
                        style={{ width: width - 30, backgroundColor: '#367CFF' }}
                        icon="message-alert"
                    >
                        SMS not available
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                {isMailAvailable == true && selectedSupport != '' ? (
                    <Button
                        textColor='white'
                        style={{ width: width - 30, backgroundColor: '#367CFF' }}
                        icon="email-edit"
                        onPress={() => navigation.navigate('Email', { id: selectedSupport })}
                    >
                        Send Email
                    </Button>
                ) : (
                    <Button
                        textColor='white'
                        style={{ width: width - 30, backgroundColor: '#367CFF' }}
                        icon="email-remove"
                    >
                        Email Not Available
                    </Button>
                )}
            </View>
            <View style={styles.containers}>
                <Button
                    textColor='white'
                    style={{ width: width - 30, backgroundColor: '#367CFF' }}
                    icon="account-off"
                    onPress={() => {
                        navigation.navigate('Authentication');
                    }}
                >
                    Log Out
                </Button>
            </View>
            <View style={styles.containers}>
                <Button
                    textColor='white'
                    style={{ width: width - 30, backgroundColor: '#367CFF' }}
                    icon="align-horizontal-left"
                    onPress={() => {
                        navigation.navigate('AdminLog');
                        // navigation.navigate('Manage Support');

                    }}
                >
                    Manage Support
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
