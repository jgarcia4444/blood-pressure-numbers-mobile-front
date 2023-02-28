import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

import CardUserRecord from '../../UserRecordsContainer/userRecord/CardUserRecord';

const {height, width} = Dimensions.get('screen');

const MostRecentRecord = ({userRecords}) => {

    const mostRecentRecordInfo = () => {
        let record = userRecords[0];
        return (
            <CardUserRecord customContainerStyle={{marginVertical: 0}} userRecord={record} />
        )
    }

    return (
        // <View style={styles.mostRecentSection}>

        //     <View style={[styles.mostRecentCard, platformShadow]}>
        <View>
            <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Most Recent</Text>
            </View>
            {userRecords.length !== 0 ?
                mostRecentRecordInfo()
            :
                <Text style={styles.noRecordText}>Nothing has been recorded yet...</Text>
            }
        </View>
        //     </View>
        // </View>
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
    noRecordText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: height * 0.025,
    }
})

const mapStateToProps = state => {
    return {
        userRecords: state.records.userRecords,
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