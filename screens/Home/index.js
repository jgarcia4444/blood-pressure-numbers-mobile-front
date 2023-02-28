import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { connect } from 'react-redux';

import MainBackgroundContainer from '../../components/backgrounds/index.js';
import HomeNumberOfRecords from '../../components/HomeNumberOfRecords/index.js';
import HomeDayStreak from '../../components/HomeDayStreak/index.js';
import MostRecentRecord from '../../components/Cards/MostRecentRecord/index.js';

import globalStyles from '../../config/styles/globalStyles.js';
const { globalContainer, platformShadow } = globalStyles; 

import fetchUserRecords from '../../redux/actions/recordActions/fetchUserRecords.js';

const Home = ({resetUserReducer, userId, fetchUserRecords, userRecords}) => {

    const viewOpacity = useRef(new Animated.Value(0)).current;

    const appTitleSection = (
        <View style={styles.appTitleContainer}>
            <Text style={styles.homeScreenTextAbbreviated}>BPN</Text>
            <Text style={styles.homeScreenText}>Blood Pressure Numbers</Text>
        </View>
    )

    const fadeIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        fadeIn()
        console.log("Here is the user id from the home screen useEffect", userId);
        if (userId !== "" && userRecords.length === 0) {
            fetchUserRecords(userId);
        } else if (userId === "") {
            resetUserReducer()
        }
    }, [userId])

    return (
        <ScrollView> 
            <Animated.View style={{opacity: viewOpacity}}>
                <MainBackgroundContainer>
                    <View style={[styles.homeScreenContainer]}>
                        {appTitleSection}
                        <MostRecentRecord />
                        <HomeDayStreak />
                        <HomeNumberOfRecords />
                    </View>
                </MainBackgroundContainer>
            </Animated.View>   
        </ScrollView>
    )
}

const  {height, width} = Dimensions.get('screen');


const styles = StyleSheet.create({
    appTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeScreenContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        marginVertical: height * 0.02,
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
})

const mapStateToProps = state => {
    return {
        userId: state.user.userId,
        userRecords: state.records.userRecords,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRecords: (userId) => dispatch(fetchUserRecords(userId)),
        resetUserReducer: () => dispatch({type: "RESET_USER_INFO"}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);