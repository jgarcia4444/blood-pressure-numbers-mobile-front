import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import CardUserRecord from '../../UserRecordsContainer/userRecord/CardUserRecord';

import globalStyles from '../../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

const {height, width} = Dimensions.get('screen');

const MostRecentRecord = ({records}) => {

    const {userRecords, loadingUserRecords} = records;

    const mostRecentRecordInfo = () => {
        let record = userRecords[0];
        return (
            <CardUserRecord customContainerStyle={{marginVertical: 0}} userRecord={record} />
        )
    }

    return (
        <View style={{width: '80%'}}>
            <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Most Recent</Text>
            </View>
            {loadingUserRecords === true ?
                <ActivityIndicator color={"#fff"} size='large' />
            :
                userRecords.length !== 0 ?
                    mostRecentRecordInfo()
                :
                <View style={[styles.noRecordsCard, platformShadow]}>
                    <Text style={styles.noRecordText}>Nothing has been recorded yet...</Text>
                </View>
                
            }
        </View>
    )
}

const styles = StyleSheet.create({
    cardTitle: {
        color: '#fff',
        fontSize: height * 0.03,
        fontWeight: '900',
    },
    cardTitleRow: {
        width: '80%',
    },
    mostRecentCard: {
        width: '80%',
        backgroundColor: '#f00',
        borderRadius: 5,
        padding: height * 0.02,
        alignItems: 'center'
    },
    mostRecentInfoContainer: {

    },
    mostRecentSection: {
        width: '100%',
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    noRecordsCard: {
        backgroundColor: "#f00",
        padding: height * 0.02,
        borderRadius: 5,
    },
    noRecordText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: height * 0.025,
        width: "100%",
    }
})

const mapStateToProps = state => {
    return {
        records: state.records,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MostRecentRecord);