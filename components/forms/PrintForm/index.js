import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
const {height, width} = Dimensions.get('screen');

import globalStyles from '../../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

const PrintForm = () => {
    const filterSelections = ["All", "Date Range"];
    const [filterIndex, setFilterIndex] = useState(0);
    const [printValid, setPrintValid] = useState(false);

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

    return (
        <View style={styles.printFormContainer}>
            <View style={styles.printFormTopRow}>
                <Text style={styles.filterSegmentTitle}>Filter</Text>
                <SegmentedControl 
                    style={styles.filterSegment}
                />
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