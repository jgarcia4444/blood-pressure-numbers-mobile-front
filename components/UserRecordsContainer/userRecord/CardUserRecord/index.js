import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('screen');

const CardUserRecord = ({userRecord}) => {
    return (
        <View>
            <Text>Card</Text>
            <Text>{userRecord.systolic}/{userRecord.diastolic}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CardUserRecord;
