import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {

    return (
        <View style={styles.homeScreenContainer}>
            <Text style={styles.homeScreenText}>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    homeScreenContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeScreenText: {
        fontSize: 64,
        fontWeight: 'bold',
    }
})

export default Home;