import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing, TouchableOpacity, Alert, TextInput } from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import { connect } from 'react-redux';

const {height, width} = Dimensions.get('screen');
import globalStyles from '../../../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

import removeRecord from '../../../../redux/actions/recordActions/removeRecord';

const CardUserRecord = ({userRecord, removeRecord, userId}) => {

    const viewOpacity = useRef(new Animated.Value(0)).current;
    const iconRotation = useRef(new Animated.Value(0)).current;
    const shrink = useRef(new Animated.Value(1)).current;

    const [showMore, setShowMore] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingSystolic, setEditingSystolic] = useState('');
    const [editingDiastolic, setEditingDiastolic] = useState('');

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
            setIsEditing(false);
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

    const shrinkAway = () => {
        Animated.timing(shrink, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear,
        }).start();
    }

    const handleRecordDelete = () => {
        let recordRemovalInfo = {
            userId,
            userRecordId: userRecord.id,
        }
        removeRecord(recordRemovalInfo);
        shrinkAway();
    }

    const handleDeletePress = () => {
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
    }, [])

    return (
        <Animated.View style={{opacity: viewOpacity, marginVertical: height * 0.03, transform: [{scale: shrink}]}}>
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
                            {isEditing === false ?
                                <Text style={styles.recordValue}>{systolic}</Text>
                            :
                            <View style={styles.formInputContainer}>
                                <TextInput 
                                    style={styles.editingInputPressure}
                                    value={editingSystolic}
                                    onChangeText={val => setEditingSystolic(val)}
                                    keyboardType='numeric'
                                    placeholder={`${systolic}`}
                                    placeholderTextColor={'#fff'}
                                />
                            </View>
                            }
                        </View>
                    </View>
                    <View style={styles.recordValueContainer}>
                        <View style={styles.recordValueLabelRow}>
                            <Text style={styles.recordValueLabel}>Diastolic</Text>
                            <View style={styles.recordValueRow}>
                                {isEditing === false ?
                                    <Text style={styles.recordValue}>{diastolic}</Text>
                                :
                                    <View style={styles.formInputContainer}>
                                        <TextInput 
                                            style={styles.editingInputPressure}
                                            value={editingDiastolic}
                                            onChangeText={val => setEditingDiastolic(val)}
                                            keyboardType='numeric'
                                            placeholder={`${diastolic}`}
                                            placeholderTextColor={'#fff'}
                                        />
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </View>
                {displayMoreInfo()}
            </View>
            <View style={styles.cardActionRow}>
                {showMore === true &&
                    <View style={styles.editDeleteContainer}>
                        {isEditing === false ?
                            <TouchableOpacity onPress={() => setIsEditing(true)} style={[platformShadow, styles.actionButton, styles.editButton]}>
                                <Ionicons name="pencil" size={22} color={'#fff'} />
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={() => setIsEditing(false)} style={[platformShadow, styles.actionButton, styles.cancelButton]}>
                                <Ionicons name="close" size={22} color={'#fff'} />
                            </TouchableOpacity>
                        }
                        {isEditing === false ?
                            <TouchableOpacity onPress={handleDeletePress} style={[platformShadow, styles.actionButton, styles.deleteButton]}>
                                <Ionicons name="trash" size={22} color={'#fff'} />
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={handleDeletePress} style={[platformShadow, styles.actionButton, styles.confirmButton]}>
                                <Ionicons name="checkmark" size={22} color={'#fff'} />
                            </TouchableOpacity>
                        }
                        
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
    cancelButton: {
        backgroundColor: '#f00',
        marginEnd: '10%',
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
    confirmButton: {
        backgroundColor: '#24f',
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
    editingInputPressure: {
        width: '100%',
        height: height * 0.04,
        color: '#fff',
        fontWeight: '900',
    },
    formInputContainer: {
        width: '97.5%',
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 5,
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

const mapStateToProps = state => {
    return {
        userId: state.user.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeRecord: recordRemovalInfo => dispatch(removeRecord(recordRemovalInfo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardUserRecord);
