import React from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Touchable, TouchableOpacity } from 'react-native';
import {Ionicons} from 'react-native-vector-icons';

import MainBackgroundContainer from '../../components/backgrounds';
import AddRecordForm from '../../components/forms/AddRecordForm';
import globalStyles from '../../config/styles/globalStyles';
const {pageTitle, pageTitleContainer} = globalStyles;



const AddRecord = () => {

    return (
        <MainBackgroundContainer>
            <View style={styles.addRecordScreenContainer}>
                <View style={[pageTitleContainer, {justifyContent: 'space-between'}]}>
                    <Text style={pageTitle}>Add Record</Text>
                    <TouchableOpacity>
                        <Ionicons style={{marginEnd: 5}} name="alarm" size={28} color={"#fff"} />
                    </TouchableOpacity>
                </View>
                <AddRecordForm />
            </View>
        </MainBackgroundContainer>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    addRecordScreenContainer: {
        height: height,
        
    },
    addRecordScreenText: {
        fontSize: 64,
        fontWeight: 'bold',
    },
})

export default AddRecord;