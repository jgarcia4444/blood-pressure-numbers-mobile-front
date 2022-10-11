import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MainBackgroundContainer from '../../components/backgrounds/index.js';

import globalStyles from '../../config/styles/globalStyles.js';
const { globalContainer } = globalStyles; 

const Home = () => {

    const appTitleSection = (
        <View style={styles.appTitleContainer}>
            <Text style={styles.homeScreenTextAbbreviated}>BPN</Text>
            <Text style={styles.homeScreenText}>Blood Pressure Numbers</Text>
        </View>
    )

    const mostRecentSection = (
        <View style={styles.mostRecentSection}>
            <View style={styles.cardTitleRow}>
                
            </View>
            <View style={styles.mostRecentCard}>

            </View>
        </View>
    )

    return (
        <MainBackgroundContainer>
            <View style={[styles.homeScreenContainer]}>
                {appTitleSection}
                {mostRecentSection}
            </View>
        </MainBackgroundContainer>
    )
}

const  {height, width} = Dimensions.get('screen');


const styles = StyleSheet.create({
    appTitleContainer: {
        height: height * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeScreenContainer: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    homeScreenText:{
        marginTop: 0,
        fontSize: height * 0.015,
        color: "#fff",
        opacity: 0.50,
    },
    homeScreenTextAbbreviated: {
        fontSize: height * 0.10,
        fontWeight: 'bold',
        marginBottom: 0,
        color: '#fff',
    }
})

export default Home;