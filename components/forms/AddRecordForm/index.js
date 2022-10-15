import React from 'react';
import { View, ScrollView, TextInput, Text, StyleSheet, Dimensions, Platform } from 'react-native';

const AddRecordForm = () => {

    return (
        <View style={styles.addRecordContainer}>
            <ScrollView style={styles.addRecordScroll}>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    addRecordContainer: {
        height: '75%',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: "#000",
        width: '100%',
    },
    addRecordScroll: {

    },
})

export default AddRecordForm;