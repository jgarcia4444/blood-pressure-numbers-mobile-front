import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, Animated } from 'react-native';

const {height, width} = Dimensions.get('screen');

const UserAuthActionsContainer = () => {

    const viewOpacity = useRef(new Animated.Value(0)).current;

    const fadeViewIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 1250,
            useNativeDriver: true,
        }).start()
    }

    useEffect(() => {
        fadeViewIn();
    })

    return (
        <Animated.View style={[styles.userAuthActionsContainer, {opacity: viewOpacity}]}>
            <Text>User Auth Actions Container</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    userAuthActionsContainer: {
        position: 'absolute',
        top: height * 0.2,
    },

})

export default UserAuthActionsContainer