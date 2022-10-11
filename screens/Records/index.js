import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainBackgroundContainer from '../../components/backgrounds';

const Records = () => {

    return (
        <MainBackgroundContainer>
            <View style={styles.recordsScreenContainer}>
                <Text style={styles.recordsScreenText}>Records Screen</Text>
            </View>
        </MainBackgroundContainer>
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