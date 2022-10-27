import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import MainBackgroundContainer from '../../components/backgrounds';

import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles;

const Records = ({recordsCount}) => {

    const horizontalBar = (
        <View style={styles.horizontalBar}></View>
    )

    const calculateAverage = () => {
        if (recordsCount === 0) {
            return (
                <View style={styles.averageValuesContainer}>
                    <View style={styles.horizontalBar}></View>
                    <Text>/</Text>
                    <View style={styles.horizontalBar}></View>
                </View>
            )
        }
    }

    return (
        <MainBackgroundContainer>
            <View style={styles.recordsScreenContainer}>
                <View style={pageTitleContainer}>
                    <Text style={pageTitle}>Records</Text>
                </View>
                <View style={styles.averageRow}>
                    <Text style={styles.averageTitle}>Average:</Text>
                    <View style={styles.averageNumbersContainer}>
                        <View>
                            <Text>(Systolic / Diastolic)</Text>
                        </View>
                        {calculateAverage()}
                    </View>
                </View>
            </View>
        </MainBackgroundContainer>
    )
}

const styles = StyleSheet.create({
    averageNumbersContainer: {
        width: '50%',
    },
    averageTitle: {
        color: '#fff',
        fontSize: 24,
    },
    averageRow: {
        width: '100%',
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordsScreenContainer: {
        width: '100%',
        height: '100%',
    },
    recordsScreenText: {
        fontSize: 64,
        fontWeight: 'bold',
    },
})

const mapStateToProps = state => {
    return {
        recordsCount: state.user.recordsCount,
        records: state.records.userRecords,
    }
}

export default connect(
    mapStateToProps,
    null
)(Records);