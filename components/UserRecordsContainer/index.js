import React, { useState } from 'react'
import { View, StyleSheet, Text, Dimensions, Platform, FlatList, KeyboardAvoidingView, Modal, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
const {height, width} = Dimensions.get('screen');
import {Ionicons} from 'react-native-vector-icons';

import RowUserRecord from './userRecord/RowUserRecord';
import CardUserRecord from './userRecord/CardUserRecord';
import PrintForm from '../forms/PrintForm';

import globalStyles from '../../config/styles/globalStyles';
const {platformShadow} = globalStyles;

const UserRecordsContainer = ({userRecords}) => {

    const [rowsSelected, setRowsSelected] = useState(true);
    const [showModal, setShowModal] = useState(false);

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

    const renderRecordItem = ({item}) => {
        return rowsSelected === true ? 
            <RowUserRecord userRecord={item} /> 
        :
            <CardUserRecord userRecord={item}/>
    }

    const handlePrintPress = () => {
        setShowModal(true);
    }

    return (
        <KeyboardAvoidingView
        style={styles.userRecordsContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Modal
                animationType='slide'
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.dismissModalRow}>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={[styles.dismissModalButton, platformShadow]}>
                            <Ionicons name="close" size={28} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.modal, platformShadow]}>
                        <PrintForm />
                    </View>
                </View>
            </Modal>
            <View style={[styles.recordsPresentationRow]}>
                <View style={styles.printButtonContainer}>
                    <Ionicons onPress={handlePrintPress} name="print" size={28} color={'#fff'} />
                </View>
                <View style={styles.presentationContainer}>
                    {cardPresentation}
                    {rowPresentation}
                </View>
            </View>
            <View style={styles.userRecordsBox}>
                <FlatList 
                    data={userRecords}
                    renderItem={renderRecordItem}
                    keyExtractor={(item, i) => `${item.dateRecorded}${item.systolic}${i}`}
                    contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    dismissModalButton: {
        backgroundColor: "#f00",
        paddingVertical: height * 0.01,
        width: '15%',
        borderRadius: '50%',
        alignItems: 'center'
    },
    dismissModalRow: {
        width: width * 0.75,
        alignItems: 'flex-end'
    },
    modal: {
        width: width * 0.75,
        height: height * 0.33,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f00",
        borderRadius: 5,
        marginTop: height * 0.01,
    },
    modalContainer: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    presentationIconContainer: {
        
    },
    presentationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%',
    },
    printButtonContainer: {
        width: '70%',
    },
    recordsPresentationRow: {
        flexDirection: 'row',
        width: '80%',
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
        alignItems: 'center',
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