import React, { useState, } from 'react';
import { View, ScrollView, TextInput, Text, StyleSheet, Dimensions, Platform } from 'react-native';

const AddRecordForm = () => {

    const [systolic, setSystolic] = useState("");
    const [diastolic, setDiastolic] = useState("");

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
    },

})

export default AddRecordForm;