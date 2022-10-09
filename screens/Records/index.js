import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Records = () => {

    return (
        <View style={styles.recordsScreenContainer}>
            <Text style={styles.recordsScreenText}>Records Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    recordsScreenContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    recordsScreenText: {
        fontSize: 64,
        fontWeight: 'bold',
    }
})

export default Records;