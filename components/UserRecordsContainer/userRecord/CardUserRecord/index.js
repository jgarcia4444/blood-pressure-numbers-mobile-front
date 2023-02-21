import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing, TouchableOpacity, Alert } from 'react-native';
import {Ionicons} from 'react-native-vector-icons'

const {height, width} = Dimensions.get('screen');
import globalStyles from '../../../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

 

const CardUserRecord = ({userRecord}) => {

    const viewOpacity = useRef(new Animated.Value(0)).current;
    const iconRotation = useRef(new Animated.Value(0)).current;

    const [showMore, setShowMore] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const {dateRecorded, systolic, diastolic, rightArmRecorded, notes} = userRecord;

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
        let date = new Date(Date.parse(dateRecorded));
        let formattedDate = `${dayOfTheWeek(date.getDay())}, ${month(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
        return formattedDate;
    }

    const rotateIcon = (rotationVal) => {
        Animated.timing(iconRotation, {
            toValue: rotationVal,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setShowMore(!showMore);
        })
    }

    const rotation = iconRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const handleMorePress = () => {
        let rotationVal
        if (showMore === false) {
            rotationVal = 1;
        } else {
            rotationVal = 0;
        }
        rotateIcon(rotationVal);
    }

    const armRecorded = () => {
        return rightArmRecorded === true ? "Right" : "Left";
    }

    const displayMoreInfo = () => {
        return showMore === true && (
            <View style={styles.moreInfoContainer}>
                <View style={[styles.dateRecordedRow, {marginTop: height * 0.01}]}>
                    <Text style={styles.dateRecordedLabel}>Arm Recorded: </Text>
                    <Text style={styles.dateRecordedValue}>{armRecorded()}</Text>
                </View>
                <View style={styles.notesRow}>
                    <Text style={styles.recordValueLabel}>Notes:</Text>
                    <View style={styles.notesContainer}>
                        <Text style={styles.notesText}>{notes}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const handleRecordDelete = () => {
        console.log("Record delete confirmed.", userRecord.id)
    }

    const handleDeletePress = () => {
        // Show alert to confirm deletion
        Alert.alert('Delete Record', 'Are you sure that you want to delete the selected record?',
        [
            {
                text: "Delete",
                onPress: handleRecordDelete,
                style: 'destructive',
            },
            {
                text: "Cancel",
                style: 'cancel',
            }
        ]
        )
    }

    useEffect(() => {
        fadeViewIn();
    }, [showMore])

    return (
        <Animated.View style={{opacity: viewOpacity, marginVertical: height * 0.03}}>
            <View style={[styles.cardUserRecord, platformShadow]}>
                <View style={styles.dateRecordedRow}>
                    <Text style={styles.dateRecordedLabel}>Date:</Text>
                    <Text style={styles.dateRecordedValue}>{readableDate()}</Text>
                </View>
                <View style={styles.recordValuesRow}>
                    <View style={styles.recordValueContainer}>
                        <View style={styles.recordValueLabelRow}>
                            <Text style={styles.recordValueLabel}>Systolic</Text>
                        </View>
                        <View style={styles.recordValueRow}>
                            <Text style={styles.recordValue}>{systolic}</Text>
                        </View>
                    </View>
                    <View style={styles.recordValueContainer}>
                        <View style={styles.recordValueLabelRow}>
                            <Text style={styles.recordValueLabel}>Diastolic</Text>
                        </View>
                        <View style={styles.recordValueRow}>
                            <Text style={styles.recordValue}>{diastolic}</Text>
                        </View>
                    </View>
                </View>
                {displayMoreInfo()}
            </View>
            <View style={styles.cardActionRow}>
                {showMore === true &&
                    <View style={styles.editDeleteContainer}>
                        <TouchableOpacity onPress={() => setIsEditing(true)} style={[platformShadow, styles.actionButton, styles.editButton]}>
                            <Ionicons name="pencil" size={22} color={'#fff'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeletePress} style={[platformShadow, styles.actionButton, styles.deleteButton]}>
                            <Ionicons name="trash" size={22} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.showMoreButtonContainer}>
                    <Animated.View style={{transform: [{rotate: rotation}]}}>
                        <Ionicons onPress={handleMorePress} name='chevron-down-circle' size={38} color={'#fff'} />
                    </Animated.View>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        width: '40%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.01,
    },
    cardActionRow: {
        width: width * 0.75,
        marginTop: height * 0.01,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cardUserRecord: {
        width: width * 0.75,
        padding: height * 0.02,
        alignItems: 'center',
        backgroundColor: '#f00',
        borderRadius: 5,
    },
    dateRecordedLabel: {
        color: '#fff',
        fontSize: height * 0.025,
        fontWeight: '300',
    },
    dateRecordedValue: {
        color: '#fff',
        marginStart: width * 0.015,
        fontSize: height * 0.025,
        fontWeight: 'bold',
    },
    dateRecordedRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    deleteButton: {
        backgroundColor: '#f00',
    },
    editButton: {
        marginEnd: '10%',
        backgroundColor: '#24f',
    },
    editDeleteContainer: {
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreInfoContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    notesContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: height * 0.01,
        width: '100%',
        borderRadius: 5,
    },
    notesRow: {
        marginTop: height * 0.01,
        width: '100%',
    },
    notesText: {
        color: '#f00',

        fontWeight: '900',
    },
    recordValue: {
        color: '#fff',
        fontSize: height * 0.025,
        fontWeight: '900',
    },
    recordValueContainer: {
        width: '50%',
    },
    recordValueLabel: {
        color: '#fff',
        fontSize: height * 0.025,
        fontWeight: '300',
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
    showMoreButtonContainer: {
        width: '25%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default CardUserRecord;
