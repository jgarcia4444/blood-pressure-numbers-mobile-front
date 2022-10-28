import React, { useState } from 'react'
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
const {height, width} = Dimensions.get('screen');
import {Ionicons} from 'react-native-vector-icons';

import RowUserRecord from './userRecord/RowUserRecord';
import CardUserRecord from './userRecord/CardUserRecord';

const UserRecordsContainer = ({userRecords}) => {

    const [rowsSelected, setRowsSelected] = useState(true);

    const rowPresentation = (
        <View style={styles.presentationIconContainer}>
            <Ionicons name='list' onPress={() => setRowsSelected(true)} size={28} color={rowsSelected === true ? '#fff' : '#999'} />
        </View>
    )

    const cardPresentation = (
        <View style={styles.presentationIconContainer}>
            <Ionicons name='albums' onPress={() => setRowsSelected(false)} size={28} color={rowsSelected === false ? '#fff' : '#999'} />
        </View>
    )

    const platformFloat = Platform.OS === 'android' ?
    {
        shadowColor: '#000',
        elevation: 3,
    }
    : 
    {
        shadowColor: '#000',
        shadowOffset: {
            height: 20,
            width: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    }

    const renderRecords = () => {
        return userRecords.map(userRecord => rowsSelected === true ? 
            <RowUserRecord userRecord={userRecord} /> 
        :
            <CardUserRecord userRecord={userRecord}/>
        )
    }

    return (
        <View style={styles.userRecordsContainer}>
            <View style={[styles.recordsPresentationRow]}>
                {cardPresentation}{rowPresentation}
            </View>
            <View style={styles.userRecordsBox}>
                {renderRecords()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    presentationIconContainer: {
        marginHorizontal: width * 0.05,
    },
    recordsPresentationRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: height * 0.03,
    },
    userRecordsBox: {

    },
    userRecordsContainer: {

    },
})

const mapStateToProps = state => {
    return {
        userRecords: state.records.userRecords,
    }
}

export default connect(
    mapStateToProps,
    null
)(UserRecordsContainer);