import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

const {height, width} = Dimensions.get('screen');
import globalStyles from '../../../../config/styles/globalStyles';
const {platformShadow} = globalStyles

 

const CardUserRecord = ({userRecord}) => {

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
        <Animated.View style={[styles.cardUserRecord, platformShadow, {opacity: viewOpacity}]}>
            <View style={styles.dateRecordedRow}>
                <Text style={styles.dateRecordedLabel}>Date:</Text>
                <Text style={styles.dateRecordedValue}>{userRecord.dateRecorded}</Text>
            </View>
            <View style={styles.recordValuesRow}>
                <View style={styles.recordValueContainer}>
                    <View style={styles.recordValueLabelRow}>
                        <Text style={styles.recordValueLabel}>Systolic</Text>
                    </View>
                    <View style={styles.recordValueRow}>
                        <Text style={styles.recordValue}>{userRecord.systolic}</Text>
                    </View>
                </View>
                <View style={styles.recordValueContainer}>
                    <View style={styles.recordValueLabelRow}>
                        <Text style={styles.recordValueLabel}>Diastolic</Text>
                    </View>
                    <View style={styles.recordValueRow}>
                        <Text style={styles.recordValue}>{userRecord.diastolic}</Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cardUserRecord: {
        width: width * 0.5,
        padding: height * 0.02,
        alignItems: 'center',
        backgroundColor: '#f00',
        borderRadius: 5,
        marginVertical: height * 0.03,
    },
    dateRecordedLabel: {
        color: '#fff',
        fontSize: height * 0.025,
        fontWeight: '900',
    },
    dateRecordedValue: {
        color: '#fff',
        marginStart: width * 0.03,
        fontSize: height * 0.025,
        fontWeight: '300',
    },
    dateRecordedRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    recordValue: {
        color: '#fff',
        fontSize: height * 0.025,
        fontWeight: '300',
    },
    recordValueContainer: {
        width: '50%',
    },
    recordValueLabel: {
        color: '#fff',
        fontSize: height * 0.025,
        fontWeight: '900',
    },
    recordValueLabelRow: {
        width: '100%',
        marginTop: height * 0.02,
    },
    recordValueRow: {

    },
    recordValuesRow: {
        width: '100%',
        flexDirection: 'row',
    },
})

export default CardUserRecord;
