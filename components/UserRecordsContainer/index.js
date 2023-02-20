import React, { useState } from 'react'
import { View, StyleSheet, Text, Dimensions, Platform, FlatList } from 'react-native';
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

    const renderRecordItem = ({item}) => {
        return rowsSelected === true ? 
            <RowUserRecord userRecord={item} /> 
        :
            <CardUserRecord userRecord={item}/>
    }

    return (
        <View style={styles.userRecordsContainer}>
            <View style={[styles.recordsPresentationRow]}>
                {cardPresentation}{rowPresentation}
            </View>
            <View style={styles.userRecordsBox}>
                <FlatList 
                    data={userRecords}
                    renderItem={renderRecordItem}
                    keyExtractor={(item, i) => `${item.dateRecorded}${item.systolic}${i}`}
                    contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                />
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
        paddingBottom: height * 0.01,
    },
    userRecordsBox: {
        width: '100%',
        flex: 1,
    },
    userRecordsContainer: {
        width: '100%',
        flex: 1,
        marginBottom: height * 0.05,
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