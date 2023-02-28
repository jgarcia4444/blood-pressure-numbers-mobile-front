import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import DateTimePicker from '@react-native-community/datetimepicker';

const {height, width} = Dimensions.get('screen');

import globalStyles from '../../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

const PrintForm = () => {
    const filterSelections = ["All", "Date Range"];
    const [filterIndex, setFilterIndex] = useState(0);
    const [printValid, setPrintValid] = useState(false);
    const [showDateRange, setShowDateRange] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const rowOpacity = useRef(new Animated.Value(0)).current

    const handlePrintPress = () => {
        if (printValid === true) {

        }
    }

    const activePrintText = () => {
        return printValid === true ? {color: "#f00"} : {}
    }

    const activePrintButton = () => {
        return printValid === true ? {borderWidth: 0, backgroundColor: "#fff", ...platformShadow} : {}
    }

    const handleDateChangeFrom = (e, selectedDate) => {

    }

    const handleDateChangeTo = (e, selectedDate) => {
        
    }

    const dateRange = (
        <Animated.View style={[styles.dateRangeRow, {opacity: rowOpacity}]}>
            <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>From</Text>
                <View style={styles.datePickerContainer}>
                    <TouchableOpacity style={styles.datePickerTouchContainer}>
                        <View style={styles.dateValueContainer}>
                            <Text style={styles.dateValue}>{fromDate}</Text>
                        </View>
                        <Ionicons color={'#fff'} size={24} name='calendar'/>
                    </TouchableOpacity>
                </View>
                {showFromPicker &&
                    <DateTimePicker 
                        testID='dateTimePickerFrom'
                        mode="date"
                        is24Hour={true}
                        onChange={handleDateChangeFrom}
                    />
                }
            </View>
            <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>To</Text>
                <View style={styles.datePickerContainer}>
                    <TouchableOpacity style={styles.datePickerTouchContainer}>
                        <View style={styles.dateValueContainer}>
                            <Text style={styles.dateValue}>{toDate}</Text>
                        </View>
                        <Ionicons color={'#fff'} size={24} name='calendar'/>
                    </TouchableOpacity>
                </View>
                {showToPicker &&
                    <DateTimePicker 
                        testID='dateTimePickerTo'
                        mode="date"
                        is24Hour={true}
                        onChange={handleDateChangeTo}
                    />
                }
            </View>
        </Animated.View>
    )

    const fadeRowIn = () => {
        Animated.timing(rowOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    const fadeRowOut =() => {
        Animated.timing(rowOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setShowDateRange(false);
            setPrintValid(true);
        })
    }

    useEffect(() => {
        if (filterIndex === 1) {
            setShowDateRange(true);
            fadeRowIn();
            if (fromDate === "" || toDate === "") {
                setPrintValid(false);
            }
        } else {
            fadeRowOut()
        }
    }, [filterIndex])

    return (
        <View style={styles.printFormContainer}>
            <View style={styles.printFormTopRow}>
                <Text style={styles.filterSegmentTitle}>Filter</Text>
                <SegmentedControl 
                    style={styles.filterSegment}
                    values={filterSelections}
                    selectedIndex={filterIndex}
                    onChange={(e) => {
                        setFilterIndex(e.nativeEvent.selectedSegmentIndex);
                    }}
                    tintColor='#f00'
                    fontStyle={{color: "#fff"}}
                    activeFontStyle={{color: '#fff'}}
                />
                {showDateRange === true &&
                    dateRange
                }
            </View>
            <View style={styles.printFormBottomRow}>
                <TouchableOpacity onPress={handlePrintPress} style={[styles.printButton, activePrintButton()]}>
                    <Text style={[styles.printText, activePrintText()]}>Print</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    datePickerColumn: {
        width: "50%",
    },
    datePickerContainer: {
        flexDirection: 'row',
        width: "100%",
        borderRadius: '50%',
        backgroundColor: "#f77",
    },
    datePickerLabel: {
        color: '#fff',
        fontWeight: '900',
        fontSize: height * 0.02,
    },
    dateRangeRow: {
        width: "100%",
        flexDirection: 'row',
        marginTop: height * 0.02,
        alignItems: 'center',
        justifyContent: "center"
    },
    datePickerTouchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dateValueContainer: {
        width: '75%',
    },
    filterSegment: {
        widht: "100%",
    },
    filterSegmentTitle: {
        color: "#fff",
        fontSize: height * 0.04,
        fontWeight: 'bold'
    },
    printFormContainer: {
        width: '90%',
        height: '90%',
    },
    printButton: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: "50%",
    },
    printFormBottomRow: {
        width: "100%",
        height: '25%',
    },
    printFormTopRow: {
        width: '100%',
        height: '75%',
    },
    printText: {
        color: "#fff",
        fontSize: height * 0.03,
        fontWeight: '900',
    },
});

export default PrintForm;