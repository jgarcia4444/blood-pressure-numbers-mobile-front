import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('screen');

const RowUserRecord = ({userRecord}) => {
    return (
        <View>
            <Text>Row</Text>
            <Text>{userRecord.systolic}/{userRecord.diastolic}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RowUserRecord