import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import addRecord from '../../../redux/actions/addRecordActions/addRecord';
import createDayStreak from '../../../redux/actions/dayStreakActions/createDayStreak';
import updateDayStreak from '../../../redux/actions/dayStreakActions/updateDayStreak';

import globalStyles from '../../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

const AddRecordForm = ({dayStreak, updateDayStreak, createDayStreak, addRecord, userId, recordPersistanceError}) => {

    const [systolic, setSystolic] = useState("");
    const [errorSystolic, setErrorSystolic] = useState("");
    const [diastolic, setDiastolic] = useState("");
    const [errorDiastolic, setErrorDiastolic] = useState("");
    const [notes, setNotes] = useState("");

    const armValues = ['Left', 'Right'];
    const [armSelectedIndex, setArmSelectedIndex] = useState(null);
    const [requirementsMet, setRequirementsMet] = useState(false);

    const handleSavePress = () => {
        if (requirementsMet === true) {
            checkForErrors()
            if (errorSystolic === "" && errorDiastolic === "" && armSelectedIndex !== null) {
                confirmationAlert();
            }
        }
    }

    const clearFormVariables = () => {
        setSystolic('');
        setDiastolic('');
        setNotes('');
        setArmSelectedIndex(null);
    }

    const persistRecord = () => {
        let recordInfo = {
            userId,
            systolic,
            diastolic,
            notes,
            rightArmRecorded: armSelectedIndex === 1 ? true : false,
        }
        addRecord(recordInfo);
        if (recordPersistanceError === "") {
            clearFormVariables()
        }
        if (dayStreak.days === 0) {
            createDayStreak(userId);
        } else if(dayStreak.days > 0 && dayStreak.nextStreakRecordAvailable === true) {
            updateDayStreak(userId);
        }
    }

    const confirmationAlert = () => {
        return Alert.alert(
            'Confirmation',
            `Saving a blood pressure record with a systolic pressure of ${systolic} and a diastolic pressure of ${diastolic}. The reading was taken on your ${armValues[armSelectedIndex]} arm. Is the previous information correct?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: persistRecord,
                }
            ]
        )
    }

    const checkForErrors = () => {
        if (isNaN(parseInt(systolic)) === true) {
            // set error for systolic
        }
        if (isNaN(parseInt(diastolic)) === true) {
            // set error for diastolic
        }
        if (armSelectedIndex === null) {
            // set error for arm taken
        }
    }

    const isValid = requirementsMet === true &&
    {
        backgroundColor: '#fff',
    }
    const isValidText = requirementsMet === true &&
    {
        color: "#f00",
    }

    const handleNotesValChange = (val) => {
        setNotes(val);
    }

    useEffect(() => {
        if ((systolic !== "") && (diastolic !== "") && (armSelectedIndex !== null)) {
            setTimeout(() => {
                setRequirementsMet(true);
            }, 500)
        } else {
            setRequirementsMet(false);
        }
    },)

    return (
        <View style={[styles.addRecordContainer]}>

            <ScrollView style={[styles.addRecordScroll, platformShadow]}>
                <KeyboardAvoidingView style={styles.scrollContent}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.formRow}>
                        <View style={styles.formCol}>
                            <View style={styles.formLabelRow}>
                                <Text style={styles.formLabel}>Systolic</Text>
                            </View>
                            <View style={styles.formInputContainer}>
                                <TextInput keyboardType='numeric' style={styles.formInput} placeholder='120' value={systolic} onChangeText={(val) => setSystolic(val)} />
                            </View>
                        </View>
                        <View style={styles.formCol}>
                            <View style={styles.formLabelRow}>
                                <Text style={styles.formLabel}>Diastolic</Text>
                            </View>
                            <View style={styles.formInputContainer}>
                                <TextInput keyboardType='numeric' style={styles.formInput} placeholder='80' value={diastolic} onChangeText={(val) => setDiastolic(val)} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formContainer}>
                            <View style={styles.formLabelRow}>
                                <Text style={styles.formLabel}>Arm Taken</Text>
                            </View>
                            <SegmentedControl 
                                style={styles.segmentControl}
                                values={armValues}
                                selectedIndex={armSelectedIndex}
                                onChange={(e) => {
                                    setArmSelectedIndex(e.nativeEvent.selectedSegmentIndex);
                                }}
                                tintColor='#fff'
                                fontStyle={{color: "#000"}}
                                activeFontStyle={{color: '#f00'}}
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formContainer}>
                            <View style={styles.formLabelRow}>
                                <Text style={styles.formLabel}>Notes</Text>
                            </View>
                            <View style={[styles.formInputContainer, {width: '100%'}]}>
                                <TextInput 
                                    value={notes}
                                    onChangeText={handleNotesValChange}
                                    placeholder="Write Here"
                                    multiline={true}
                                    style={styles.notesTextArea}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <TouchableOpacity style={[styles.saveBtn, isValid]} onPress={handleSavePress}>
                            <Text style={[styles.saveBtnText, isValidText]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

const {height, width} = Dimensions.get('screen')

const styles = StyleSheet.create({
    addRecordContainer: {
        height: '75%',
        width: '100%',
    },
    addRecordScroll: {
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        padding: height * 0.01,
        borderRadius: height * 0.01,
        borderColor: '#f00',
    },
    formCol: {
        width: '50%',
    },
    formContainer: {
        width: '100%',
    },
    formInput: {
        width: '100%',
        height: height * 0.04,
    },
    formInputContainer: {
        width: '97.5%',
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 5,
    },
    formLabel: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
    },
    formLabelRow: {
        width: '100%',
    },
    formRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: height * 0.025,
    },
    notesTextArea: {
        width: '100%',
        height: height * 0.1,
    },
    saveBtn: {
        width: '100%',
        paddingVertical: height * 0.02,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
        borderRadius: 5,
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 18,
    },
    scrollContent: {
        height: height * 0.75,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    segmentControl: {
        width: '100%',
    },
})

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        recordPersistanceError: state.addRecord.recordPersistanceError,
        dayStreak: state.dayStreak,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addRecord: (recordInfo) => dispatch(addRecord(recordInfo)),
        createDayStreak: userId => dispatch(createDayStreak(userId)),
        updateDayStreak: userId => dispatch(updateDayStreak(userId)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRecordForm);