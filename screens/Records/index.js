import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainBackgroundContainer from '../../components/backgrounds';

import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles;

const Records = () => {

    return (
        <MainBackgroundContainer>
            <View style={styles.recordsScreenContainer}>
                <View style={pageTitleContainer}>
                    <Text style={pageTitle}>Records</Text>
                </View>
                <View style={styles.sectionTitleRow}>
                    <Text style={styles.sectionTitle}>Average</Text>
                </View>
            </View>
        </MainBackgroundContainer>
    )
}

const styles = StyleSheet.create({
    recordsScreenContainer: {
        width: '100%',
        height: '100%',
    },
    recordsScreenText: {
        fontSize: 64,
        fontWeight: 'bold',
    },
    sectionTitle: {

    },
    sectionTitleRow: {
        width: '100%',
    },
})

export default Records;