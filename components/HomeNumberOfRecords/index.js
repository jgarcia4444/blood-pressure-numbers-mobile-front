import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

const HomeNumberOfRecords = ({recordsCount, loadingUserRecords}) => {

    const navigation = useNavigation();

    const navigateToRecords = () => {
        navigation.navigate('Records');
    }

    const renderRecordsCount = () => {
        return loadingUserRecords === true ? 
            <ActivityIndicator size={'large'} color={'#fff'} />
        :
            <Text style={styles.recordsNumber}>{recordsCount}</Text>
    }

    return (
        <View style={styles.homeNumberOfRecordsRow}>
            <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Amount of records taken</Text>
            </View>
            <View style={styles.numberSeeAllContainer}>
                <View style={styles.numberContainer}>
                    {renderRecordsCount()}
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
        fontWeight: 'bold',
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
        loadingUserRecords: state.records.loadingUserRecords,
    }
}

export default connect(
    mapStateToProps,
    null
)(HomeNumberOfRecords);