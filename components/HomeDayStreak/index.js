import React, {useEffect} from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../config/styles/globalStyles';
const {platformShadow} = globalStyles
const {height, width} = Dimensions.get("screen");

import fetchDayStreakInfo from '../../redux/actions/dayStreakActions/fetchDayStreakInfo';

const HomeDayStreak = ({dayStreak, userId, fetchDayStreakInfo}) => {

    const navigation = useNavigation();

    const {days, nextStreakRecordAvailable, hoursUntilExpiration, dayStreakLoading, loadError, fetchDetails} = dayStreak;

    const loadingModal = (
        <View style={styles.loadingModal}>
            <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
    )

    useEffect(() => {
        if (fetchDetails === true) {
            fetchDayStreakInfo(userId);
        }
    },[fetchDetails])

    return (
        <View style={styles.homeDayStreakContainer}>
            <View style={styles.homeDayStreakTitleRow}>
                <Text style={styles.homeDayStreakTitle}>Record Recorded</Text>
                {hoursUntilExpiration > 0 &&
                    <Text>{hoursUntilExpiration} left</Text>
                }
            </View>
            <View style={[styles.homeDayStreakCard, platformShadow]}>
                {dayStreakLoading === true &&
                    loadingModal
                }
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
                        <TouchableOpacity onPress={() => navigation.navigate('AddRecord')} style={[styles.addToStreakButton, platformShadow]}>
                            <Text style={styles.addToStreakButtonText}>Record</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addToStreakButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: height * 0.01,
    },
    addToStreakButtonText: {
        color: '#f00',
        fontWeight: "900",
    },
    addToStreakRow: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: height * 0.01,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    days: {

    },
    daysDescription: {

    },
    daysDescriptionContainer: {

    },
    homeDayStreakCard: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#f00',
        padding: height * 0.01,
    },
    homeDayStreakContainer: {
        width: '80%'
    },
    homeDayStreakTitle:{
        fontWeight: '900',
        color: '#fff',
        fontSize: height * 0.03,
    },
    homeDayStreakTitleRow: {
        width: '100%',
        flexDirection: "row",
    },
    loadingModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    nextRecordDescription: {
        color: "#fff",
        fontWeight: '900',
    },
    noDays: {
        color: '#fff',
        fontSize: height * 0.03,
        fontWeight: "900",
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