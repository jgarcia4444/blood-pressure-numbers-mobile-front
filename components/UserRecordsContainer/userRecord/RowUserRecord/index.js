import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

import globalStyles from '../../../../config/styles/globalStyles';
const {platformShadow} = globalStyles

const {height, width} = Dimensions.get('screen');

const RowUserRecord = ({userRecord}) => {

    const viewOpacity = useRef(new Animated.Value(0)).current;

    const fadeViewIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true,
        }).start();
    }

    const dayOfTheWeek = (dayIndex) => {
        let dayCipher = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        return dayCipher[dayIndex];
    }

    const month = (monthIndex) => {
        let monthCipher = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "NOV", "DEC"];
        return monthCipher[monthIndex]
    }

    const readableDate = () => {
        let date = new Date(Date.parse(userRecord.dateRecorded));
        let formattedDate = `${dayOfTheWeek(date.getDay())}, ${month(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
        return formattedDate;
    }

    useEffect(() => {
        fadeViewIn()
    })

    return (
        <Animated.View style={[{opacity: viewOpacity}, platformShadow]}>
            <View style={styles.rowUserRecordContainer}>
                <View style={styles.dateRecordedContainer}>
                    <Text style={styles.recordLabel}>Date</Text>
                    <Text style={styles.recordValue}>{readableDate()}</Text>
                </View>
                <View style={styles.recordValueContainer}>
                    <Text style={styles.recordLabel}>Systolic</Text>
                    <Text style={styles.recordValue}>{userRecord.systolic}</Text>
                </View>
                <View style={styles.recordValueContainer}>
                    <Text style={styles.recordLabel}>Diastolic</Text>
                    <Text style={styles.recordValue}>{userRecord.diastolic}</Text>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    dateRecordedContainer: {
        width: '40%',
        alignItems: 'flex-start',
    },
    recordLabel: {
        color: "#fff",
        fontSize: height * 0.025,
        fontWeight: '300',
    },
    recordValue: {
        color: '#fff',
        fontSize: height * 0.025,
        fontWeight: '900',
    },
    recordValueContainer: {
        width: '30%',
    },
    rowUserRecordContainer: {
        flexDirection: 'row',
        width: width * 0.95,
        backgroundColor: '#f00',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.02,
        borderRadius: 5,
        marginBottom: height * 0.01,
    },
})

export default RowUserRecord