import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import MainBackgroundContainer from '../../components/backgrounds/index.js';

import globalStyles from '../../config/styles/globalStyles.js';
const { globalContainer } = globalStyles; 

const Home = () => {

    const mostRecentRecord = undefined;

    const configuredCardShadow = Platform.OS === 'android' ?
        {
            elevation: 7,
        }
        :
        {
            shadowColor: '#000',
            shadowOpacity: 0.35,
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 3,
        };

    const appTitleSection = (
        <View style={styles.appTitleContainer}>
            <Text style={styles.homeScreenTextAbbreviated}>BPN</Text>
            <Text style={styles.homeScreenText}>Blood Pressure Numbers</Text>
        </View>
    )

    const mostRecentSection = (
        <View style={styles.mostRecentSection}>
            <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Most Recent</Text>
            </View>
            <View style={[styles.mostRecentCard, configuredCardShadow]}>
                {mostRecentRecord !== undefined ?
                    <Text>Record Found!</Text>
                    :
                    <Text style={{color: '#fff'}}>Nothing has been recorded yet...</Text>
                }
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
    cardTitle: {
        color: '#fff',
        fontSize: height * 0.03,
    },
    cardTitleRow: {
        width: '80%',
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
    },
    mostRecentCard: {
        width: '80%',
        backgroundColor: '#f00',
        borderRadius: 5,
        padding: height * 0.02,
        alignItems: 'center'
    },
    mostRecentSection: {
        marginTop: height * 0.05,
        width: '100%',
        alignItems: 'center',
        justifyContent: "center"
    },

})

export default Home;