import React, {useEffect} from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../config/styles/globalStyles';
const {platformShadow} = globalStyles
const {height, width} = Dimensions.get("screen");

import fetchDayStreakInfo from '../../redux/actions/dayStreakActions/fetchDayStreakInfo';

const HomeDayStreak = ({dayStreak, userId, fetchDayStreakInfo}) => {

    const {days, nextStreakRecordAvailable, hoursUntilExpiration, dayStreakLoading, loadError} = dayStreak;

    const loadingModal = (
        <View style={styles.loadingModal}>
            <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
    )

    useEffect(() => {
        fetchDayStreakInfo(userId);
    })

    return (
        <View style={[styles.homeDayStreakContainer, platformShadow]}>
            {dayStreakLoading === true &&
                loadingModal
            }
            <View style={styles.homeDayStreakTitleRow}>
                <Text style={styles.homeDayStreakTitle}>Record Recorded</Text>
                {hoursUntilExpiration > 0 &&
                    <Text>{hoursUntilExpiration} left</Text>
                }
            </View>
            <View style={styles.daysDescriptionContainer}>
                {days > 0 ?
                    <>
                        <Text style={styles.days}>{days}</Text>
                        <Text style={styles.daysDescription}>{days > 1} in a row</Text>
                    </>
                :
                    <Text style={styles.noDays}>Start a new streak today!</Text>
                }
            </View>
            {nextStreakRecordAvailable === true &&
                <View style={styles.addToStreakRow}>
                    <Text style={styles.nextRecordDescription}>Record a Blood Pressure</Text>
                    <TouchableOpacity style={[styles.addToStreakButton, platformShadow]}>
                        <Text style={styles.addToStreakButtonText}>Record</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    addToStreakButton: {
        backgroundColor: '#f33',
        borderRadius: 5,
        padding: height * 0.01,
    },
    addToStreakButtonText: {
        color: '#fff',
        fontWeight: "900",
    },
    addToStreakRow: {
        flexDirection: 'row',
        width: '100%',
    },
    days: {

    },
    daysDescription: {

    },
    daysDescriptionContainer: {

    },
    homeDayStreakContainer: {
        backgroundColor: '#f00',
        borderRadius: 5,
        padding: height * 0.01
    },
    homeDayStreakTitle:{
        fontWeight: '900',
        color: '#fff',
    },
    homeDayStreakTitleRow: {
        width: '100%',
        flexDirection: "row",
    },
    loadingModal: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    nextRecordDescription: {

    },
    noDays: {

    },
});

const mapStateToProps = state => {
    return {
        dayStreak: state.dayStreak,
        userId: state.user.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDayStreakInfo: userId => dispatch(fetchDayStreakInfo(userId)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeDayStreak);