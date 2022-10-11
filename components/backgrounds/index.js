import React from 'react';
import { StyleSheet, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import globalStyles from '../../config/styles/globalStyles';
const {globalContainer} = globalStyles;

const MainBackgroundContainer = ({children}) => {
    return (
        <LinearGradient
            colors={['#f00', '#f77', '#fdd']}
            start={{x: 0.25, y: 0.25}}
            end={{x:0.99, y: 0.99}}
            style={[globalContainer, styles.background]}
        >
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {

    },
})

export default MainBackgroundContainer;