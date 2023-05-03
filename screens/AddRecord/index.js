import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import MainBackgroundContainer from '../../components/backgrounds';
import AddRecordForm from '../../components/forms/AddRecordForm';
import globalStyles from '../../config/styles/globalStyles';
const {pageTitle, pageTitleContainer, platformShadow} = globalStyles;



const AddRecord = () => {

    const [showNotificationForm, setShowNotificationForm] = useState(false);
    const [reminderTime, setReminderTime] = useState(new Date());

    const handleReminderPress = () => {
        setShowNotificationForm(true);  
    }

    const handleSavePress = () => {
        console.log("Save Pressed!");
    }

    const closeButton = (
        <TouchableOpacity onPress={() => setShowNotificationForm(false)} style={[styles.closeButton, platformShadow]}>
            <Ionicons name="close" size={32} color={"#fff"} />
        </TouchableOpacity>
    )

    const formModal = (
        <Modal transparent={true} animationType='slide' style={styles.formModal}>
            <View style={styles.formModalContainer}>
                <View style={[styles.formContainer, platformShadow]}>
                    {closeButton}
                    <View>
                        <Text style={styles.formTitle}>Set a reminder time!</Text>
                    </View>
                    <View style={styles.timePickerContainer}>
                        <Text style={styles.timePickerLabel}>Time</Text>
                        <View style={styles.timePickerWrapper}>
                            <DateTimePicker 
                                mode="time"
                                display="clock"
                                is24Hour={true}
                                value={reminderTime}
                                style={styles.timePicker}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

    return (
        <MainBackgroundContainer>
            <View style={styles.addRecordScreenContainer}>
                <View style={[pageTitleContainer, {justifyContent: 'space-between'}]}>
                    <Text style={pageTitle}>Add Record</Text>
                    <TouchableOpacity onPress={handleReminderPress}>
                        <Ionicons style={{marginEnd: 10}} name="alarm" size={36} color={"#fff"} />
                        {showNotificationForm === true &&
                            formModal
                        }
                    </TouchableOpacity>
                </View>
                <AddRecordForm />
            </View>
        </MainBackgroundContainer>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    addRecordScreenContainer: {
        height: height,
        
    },
    addRecordScreenText: {
        fontSize: 64,
        fontWeight: 'bold',
    },
    closeButton: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#f00',
        position: 'absolute',
        right: -24,
        top: -24,
    },
    formContainer: {
        width: '75%',
        backgroundColor: '#f00',
        padding: height * 0.04,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center",
    },
    formModal: {
        
    },
    formModalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
    },
    formTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: height * 0.03,
    },
    timePicker: {
        height: '40%',
        width: '100%',
    },
    timePickerWrapper: {
        width: '50%',
        height: '45%',
        alignItems:'center',
        justifyContent: 'center',
    },
    timePickerContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',  
    },
    timePickerLabel: {
        color: "#fff",
        fontSize: height * 0.03,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#fff',
        paddingVertical: height * 0.02,
        paddingHorizontal: height * 0.10,
        borderRadius: 10,
    },
    saveButtonText: {
        color: "#f00",
        fontWeight: 'bold',
        fontSize: height * 0.03,
    }
})

export default AddRecord;