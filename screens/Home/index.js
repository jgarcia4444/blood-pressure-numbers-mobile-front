import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MainBackgroundContainer from '../../components/backgrounds/index.js';

import globalStyles from '../../config/styles/globalStyles.js';
const { globalContainer } = globalStyles; 

const Home = () => {

    return (
        <MainBackgroundContainer>
            <View style={[styles.homeScreenContainer]}>
                <View>
                    <Text style={styles.homeScreenTextAbbreviated}>BPN</Text>
                    <Text style={styles.homeScreenText}>Blood Pressure Numbers</Text>
                </View>
            </View>
        </MainBackgroundContainer>
    )
}

const  {height, width} = Dimensions.get('screen');


const styles = StyleSheet.create({
    homeScreenContainer: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    homeScreenText:{

    },
    homeScreenTextAbbreviated: {
        fontSize: 54,
        fontWeight: 'bold',
    }
})

export default Home;