import React, { useState, } from 'react';
import { View, ScrollView, TextInput, Text, StyleSheet, Dimensions, Platform, } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const AddRecordForm = () => {

    const [systolic, setSystolic] = useState("");
    const [diastolic, setDiastolic] = useState("");

    const armValues = ['Left', 'Right'];
    const [armSelectedIndex, setArmSelectedIndex] = useState();

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
        width: '95%',
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
    segmentControl: {
        width: '100%',

    },
})

export default AddRecordForm;