import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { getSupportList, deleteSelectedSupport, resetSupport } from './DataBase';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

const ManageSupport = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const [supportOptions, setSupportOptions] = useState([]);
    const [selectedSupport, setSelectedSupport] = useState('');


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

    

    const handleDeleteSupport = () => {
        if (selectedSupport) {
            const selectedSupportItem = supportOptions.find(option => option.key === selectedSupport);
            const selectedSupportName = selectedSupportItem ? selectedSupportItem.value : 'Unknown Support';

            Alert.alert(
                'Confirm Deletion',
                `Are you sure you want to delete the support ${selectedSupportName}?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            await deleteSelectedSupport(selectedSupport);
                            setSelectedSupport('');
                            fetchSupportOptions(); // Refresh support options after deletion
                        },
                        style: 'destructive',
                    },
                ],
                { cancelable: true }
            );
        } else {
            Alert.alert('No Support Selected', 'Please select a support option before deleting.');
        }
    };

    const handleUpdateSupport = () => {
        if (selectedSupport) {
            navigation.navigate('Update Support', { id: selectedSupport });
        } else {
            Alert.alert('No Support Selected', 'Please select a support option before updating.');
        }
    };
    const handleResetSupport =()=>{
        resetSupport();
    }

    return (
        <View style={styles.container}>
            <View style={{ width: width - 30 }}>
                <SelectList
                    placeholder='Select the Department'
                    setSelected={(item) => setSelectedSupport(item)}
                    boxStyles={{margin: 20,padding: 10,borderColor:'#367CFF',borderRadius:15, alignItems:'center'}}
                    dropdownStyles={{borderColor:'#367CFF'}}
                    inputStyles={{color:'#367CFF'}}
                    data={supportOptions}
                    zIndex={3000}
                    style={{ width: width - 10, backgroundColor: '#EAEAEA' }}
                />
            </View>
            <Button icon={'delete'} onPress={handleDeleteSupport} style={styles.button}>Delete</Button>
            <Button icon={'update'} onPress={handleUpdateSupport} style={styles.button}>Update</Button>
            <Button icon={'plus-circle'} onPress={() => navigation.navigate('Add Support')} style={styles.button}>Add New Support</Button>
            <Button icon={'delete'} onPress={handleResetSupport} style={styles.button}>Delete All</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        padding: 10,
        width: 200,
        marginTop: 20,
        borderColor: '#367CFF',
        borderWidth: 1,
    }
});

export default ManageSupport;
