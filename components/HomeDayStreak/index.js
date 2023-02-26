import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../config/styles/globalStyles';
const {platformShadow} = globalStyles

const {height, width} = Dimensions.get("screen");

const HomeDayStreak = ({dayStreak}) => {

    const {days, nextStreakRecordAvailable, hoursUntilExpiration, dayStreakLoading, loadError} = dayStreak;

    return (
        <View style={[styles.homeDayStreakContainer, platformShadow]}>
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
                    <TouchableOpacity style={styles.addToStreakButton}>
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
    nextRecordDescription: {

    },
    noDays: {

    },
});

const mapStateToProps = state => {
    return {
        dayStreak: state.dayStreak,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeDayStreak);