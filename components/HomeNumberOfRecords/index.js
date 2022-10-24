import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const HomeNumberOfRecords = ({recordsCount}) => {

    const navigation = useNavigation();

    const navigateToRecords = () => {
        navigation.navigate('Records');
    }

    return (
        <View style={styles.homeNumberOfRecordsRow}>
            <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Amount of records taken</Text>
            </View>
            <View style={styles.numberSeeAllContainer}>
                <View style={styles.numberContainer}>
                    <Text style={styles.recordsNumber}>{recordsCount}</Text>
                </View>
                <View style={styles.seeAllButtonContainer}>
                    <TouchableOpacity onPress={navigateToRecords} style={styles.seeAllButton}>
                        <Text style={styles.seeAllButtonText}>See All</Text>
                    </TouchableOpacity>
                </View>
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
    numberContainer: {
        width: '50%',
        alignItems: 'flex-start',
    },
    numberSeeAllContainer: {
        width: '80%',
        flexDirection: 'row',
    },
    recordsNumber: {
        color: '#fff',
        fontSize: height * 0.06,
        fontWeight: '100',
    },
    seeAllButton: {
        padding: height * 0.015,
        backgroundColor: "#f00",
        borderRadius: 5,
    },
    seeAllButtonContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    seeAllButtonText: {
        color: '#fff',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: height * 0.03,
    },
    sectionTitleRow: {
        width: '80%',
    }
});

const mapStateToProps = state => {
    return {
        recordsCount: state.user.recordsCount,
    }
}

export default connect(
    mapStateToProps,
    null
)(HomeNumberOfRecords);