import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ActivityIndicator } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import * as Print from 'expo-print'
import { shareAsync, isAvailableAsync } from 'expo-sharing';

const {height, width} = Dimensions.get('screen');

import globalStyles from '../../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

import fetchFilteredRecords from '../../../redux/actions/printableRecordsActions/fetchFilteredRecords';

const PrintForm = ({userRecords, printableRecords, fetchFilteredRecords, dateRangeError, userId}) => {
    const filterSelections = ["All", "Date Range"];
    const [filterIndex, setFilterIndex] = useState(0);
    const [printValid, setPrintValid] = useState(false);
    const [showDateRange, setShowDateRange] = useState(false);
    const [fromDate, setFromDate] = useState(new Date(Date.now()));
    const [toDate, setToDate] = useState(new Date(Date.now()));

    const rowOpacity = useRef(new Animated.Value(0)).current;

    const {filteredRecords, fetchFilteredRecordsError, fetchingFilteredRecords} = printableRecords;

    const handlePrintPress = () => {
        if (printValid === true) {
            if (filterIndex === 1) {
                let dateRange = {fromDate, toDate, userId};
                let fromYear = fromDate.getFullYear();
                let toYear = toDate.getFullYear();
                if (fromYear < toYear) {
                    fetchFilteredRecords(dateRange);
                } else if (fromYear === toYear) {
                    let fromMonth = fromDate.getMonth();
                    let toMonth = toDate.getMonth();
                    if (fromMonth < toMonth) {
                        fetchFilteredRecords(dateRange);
                    } else if (fromMonth === toMonth) {
                        let fromDay = fromDate.getDate();
                        let toDay = toDate.getDate();
                        if (fromDay <= toDay) {
                            if (fetchFilteredRecordsError === "") {
                                printRecords();
                            }
                        } else {
                            dateRangeError({
                                fromDateError: "Must be before or equal to the 'To' date.",
                                toDateError: "Must be after or equal to the 'From' date"
                            });
                        }
                    } else {
                        dateRangeError({
                            fromDateError: "Must be before or equal to the 'To' date.",
                            toDateError: "Must be after or equal to the 'From' date"
                        });
                    }
                } else {
                    dateRangeError({
                        fromDateError: "Must be before or equal to the 'To' date.",
                        toDateError: "Must be after or equal to the 'From' date"
                    });
                }  
            } else {
                printRecords()
            }
            
        }
    }

    const genrateHtml = () => {
        let records
        if (filterIndex === 1) {
            records = filteredRecords;
        } else {
            records = userRecords
        }
        return `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                </head>
                <body>
                    <h1>Blood Pressure Records</h1>
                    ${records.map(record => {
                        return `
                        <div><strong>Systolic:</strong> ${record.systolic}, <strong>Diastolic:</strong> ${record.diastolic}, <strong>Date:</strong> ${record.dateRecorded}</div>
                        `
                    })}
                </body>
            </html>
        `
    }

    const printRecords = async () => {
        let html = genrateHtml();
        const file = await Print.printToFileAsync({html});
        if (isAvailableAsync()) {
            await shareAsync(file.uri, {UTI: '.pdf', mimeType: 'application/pdf'});
        } else {
            console.log("Is Available Async", isAvailableAsync())
        }
    }

    const activePrintText = () => {
        return printValid === true ? {color: "#f00"} : {}
    }

    const activePrintButton = () => {
        return printValid === true ? {borderWidth: 0, backgroundColor: "#fff", ...platformShadow} : {}
    }

    const handleDateChangeFrom = (e, selectedDate) => {
        setFromDate(selectedDate);
        fetchFilteredRecords({
            fromDate: selectedDate,
            toDate,
            userId,
        })
    }

    const handleDateChangeTo = (e, selectedDate) => {
        setToDate(selectedDate);
        fetchFilteredRecords({
            fromDate,
            toDate: selectedDate,
            userId,
        })
    }

    const dateRange = (
        <Animated.View style={[styles.dateRangeRow, {opacity: rowOpacity}]}>
            <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>From</Text>
                <DateTimePicker
                    style={styles.datePickerTouchContainer}
                    value={fromDate}
                    testID='dateTimePickerFrom'
                    mode="date"
                    is24Hour={true}
                    onChange={handleDateChangeFrom}
                />
            </View>
            <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>To</Text>
                <DateTimePicker
                    style={styles.datePickerTouchContainer}
                    value={toDate}
                    testID='dateTimePickerTo'
                    mode="date"
                    is24Hour={true}
                    onChange={handleDateChangeTo}
                />
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
            {fetchingFilteredRecords === true ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={"#fff"} size='large'/>
                </View>
                :
                <>
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
                </>
            }
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
    loadingContainer: {
        positon: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
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

const mapStateToProps = state => {
    return {
        printableRecords: state.printableRecords,
        userRecords: state.records.userRecords,
        userId: state.user.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFilteredRecords: dateRange => dispatch(fetchFilteredRecords(dateRange)),
        dateRangeError: errors => dispatch({type: "FILTERED_RECORDS_RANGE_ERROR", errors}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrintForm);