import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainBackgroundContainer from '../../components/backgrounds';

const AddRecord = () => {

    return (
        <MainBackgroundContainer>
            <View style={styles.addRecordScreenContainer}>
                <Text style={styles.addRecordScreenText}>Add Record Screen</Text>
            </View>
        </MainBackgroundContainer>
    )
}

const styles = StyleSheet.create({
    addRecordScreenContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    addRecordScreenText: {
        fontSize: 64,
        fontWeight: 'bold',
    }
})

export default AddRecord;