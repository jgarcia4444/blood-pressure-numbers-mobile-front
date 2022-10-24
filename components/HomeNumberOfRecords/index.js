import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, } from 'react-native';

const HomeNumberOfRecords = () => {

    return (
        <View style={styles.homeNumberOfRecordsRow}>
            <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Amount of records taken</Text>
            </View>
            <View style={styles.numberSeeAllContainer}>

            </View>
        </View>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    homeNumberOfRecordsRow: {
        width: '100%',
        height: height * 0.15,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    numberSeeAllContainer: {

    },
    sectionTitle: {
        color: '#fff',
        fontSize: height * 0.03,
    },
    sectionTitleRow: {
        width: '80%',
    }
});

export default HomeNumberOfRecords;