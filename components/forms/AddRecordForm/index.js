import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const AddRecordForm = () => {

    const [systolic, setSystolic] = useState("");
    const [diastolic, setDiastolic] = useState("");
    const [notes, setNotes] = useState("");

    const armValues = ['Left', 'Right'];
    const [armSelectedIndex, setArmSelectedIndex] = useState(null);
    const [requirementsMet, setRequirementsMet] = useState(false);

    const handleSavePress = () => {

    }

    const isValid = requirementsMet === true &&
    {
        backgroundColor: '#fff',
    }
    const isValidText = requirementsMet === true &&
    {
        color: "#f00",
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
            <ScrollView style={styles.addRecordScroll}>
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
                                onChange={(val) => setNotes(val)}
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
        marginVertical: height * 0.025,
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
    segmentControl: {
        width: '100%',

    },
})

export default AddRecordForm;