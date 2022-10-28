import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

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

    useEffect(() => {
        fadeViewIn()
    })

    return (
        <Animated.View style={[styles.rowUserRecordContainer, {opacity: viewOpacity}]}>
            <View style={styles.dateRecordedContainer}>
                <Text style={styles.recordLabel}>Date</Text>
                <Text style={styles.recordValue}>{userRecord.dateRecorded}</Text>
            </View>
            <View style={styles.recordValueContainer}>
                <Text style={styles.recordLabel}>Systolic</Text>
                <Text style={styles.recordValue}>{userRecord.systolic}</Text>
            </View>
            <View style={styles.recordValueContainer}>
                <Text style={styles.recordLabel}>Diastolic</Text>
                <Text style={styles.recordValue}>{userRecord.diastolic}</Text>
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
        opacity: 0.75,
        fontSize: height * 0.025,
    },
    recordValue: {
        color: '#fff',
        fontSize: height * 0.025,
    },
    recordValueContainer: {
        width: '30%',
    },
    rowUserRecordContainer: {
        flexDirection: 'row',
        width: width * 0.95,
        borderBottomWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#f00',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.02,
    },
})

export default RowUserRecord