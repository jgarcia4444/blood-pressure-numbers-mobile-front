import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import MainBackgroundContainer from '../../components/backgrounds';
import UserRecordsContainer from '../../components/UserRecordsContainer';

import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles;

import fetchUserRecords from '../../redux/actions/recordActions/fetchUserRecords';

const {height, width} = Dimensions.get('screen');

const Records = ({recordsCount, records, userId, fetchUserRecords}) => {

    const calculateAverage = () => {
        if (recordsCount === 0) {
            return (
                <View style={styles.averageValuesContainer}>
                    <View style={[styles.horizontalBar, {marginEnd: width * 0.02}]}></View>
                    <Text style={{color: '#fff'}}>/</Text>
                    <View style={[styles.horizontalBar, {marginStart: width * 0.02}]}></View>
                </View>
            )
        } else {
            let sumSystolic = 0;
            let sumDiastolic = 0;
            records.forEach(record => {
                sumSystolic += record.systolic;
                sumDiastolic += record.diastolic;
            })
            let averageSystolic = (sumSystolic / records.length).toFixed(2);
            let averageDiastolic = (sumDiastolic / records.length).toFixed(2);
            return (
                <View style={styles.averageValuesContainer}>
                    <Text style={[styles.averageValue, {marginEnd: width * 0.02, fontWeight: '900'}]}>{averageSystolic}</Text>
                    <Text style={styles.averageValue}>/</Text>
                    <Text style={[styles.averageValue, {marginStart: width * 0.02, fontWeight: '900'}]}>{averageDiastolic}</Text>
                </View>
            )
        }
    }

    useEffect(() => {
        if (userId !== "" && records.length === 0) {
            fetchUserRecords(userId)
        }
    })

    return (
        <MainBackgroundContainer>
            <View style={styles.recordsScreenContainer}>
                <View style={pageTitleContainer}>
                    <Text style={pageTitle}>Records</Text>
                </View>
                <View style={styles.averageRow}>
                    <Text style={styles.averageTitle}>Average:</Text>
                    <View style={styles.averageNumbersContainer}>
                        <View style={styles.averageValuesTitleContainer}>
                            <Text style={styles.averageValuesTitle}>(Systolic / Diastolic)</Text>
                        </View>
                        {calculateAverage()}
                    </View>
                </View>
                <UserRecordsContainer />
            </View>
        </MainBackgroundContainer>
    )
}

const styles = StyleSheet.create({
    averageNumbersContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
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
    averageValue: {
        color: '#fff'
    },
    averageValuesContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    averageValuesTitle: {
        color: '#fff',
        fontSize: 12,
    },
    averageValuesTitleContainer: {

    },
    horizontalBar: {
        width: 28,
        height: 6,
        backgroundColor: '#fff',
        borderRadius: 5,
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
        userId: state.user.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRecords: (userId) => dispatch(fetchUserRecords(userId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Records);