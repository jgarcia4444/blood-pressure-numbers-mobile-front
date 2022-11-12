import React, {useEffect, useRef} from 'react'
import { Animated, View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
const {height, width} = Dimensions.get('screen');
import { connect } from 'react-redux';

import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles

import MainBackgroundContainer from '../../components/backgrounds';
import UserAuthActionsContainer from '../../components/userAuth/UserAuthActionsContainer';
import logoutUser from '../../redux/actions/userActions/logoutUser';

const Profile = ({email, logoutUser, authenticationLoading}) => {

    console.log("User email from Profile Screen", email);

    const viewOpacity = useRef(new Animated.Value(0)).current;

    const logoutButton = (
        <TouchableOpacity onPress={logoutUser} style={styles.logoutButton}>
            {authenticationLoading === true ?
                <ActivityIndicator color={'#f00'} size="large" />
            :
                <Text style={styles.logoutText}>Logout</Text>
            }
        </TouchableOpacity>
    )

    const renderGreeting = () => {
        let todaysDate = new Date()
        let todaysHour = todaysDate.getHours();
        let timeBasedGreeting = '';
        if (todaysHour < 12) {
            timeBasedGreeting = "Morning";
        } else if (todaysHour > 11 && todaysHour < 18) {
            timeBasedGreeting = "Afternoon"
        } else {
            timeBasedGreeting = 'Evening';
        }
        return (
            <View style={styles.timeBasedGreetingRow}>
                <Text style={styles.greetingText}>Good {timeBasedGreeting}</Text>
            </View>
        )
    }

    const changePasswordButton = (
        <View style={styles.changePasswordRow}>
            <TouchableOpacity style={styles.changePasswordButton}>
                <Text style={styles.changePasswordText}>Change Password</Text>
            </TouchableOpacity>            
        </View>
    )

    const userProfile = (
        <View style={styles.userProfileContainer}>
            <View style={styles.userInfoContainer}>
                {renderGreeting()}
                <View style={styles.userEmailRow}>
                    <Text style={styles.emailLabel}>Email:</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
                {changePasswordButton}
            </View>
            <View style={styles.logoutRow}>
                {logoutButton}
            </View>
        </View>
    )

    const renderProfileView = () => {
        return email === "" ?
        <UserAuthActionsContainer />
        :
        userProfile
    }

    const fadeViewIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        fadeViewIn()
    })

    return (
        <MainBackgroundContainer>
            <Animated.View style={[styles.profileScreenContainer, {opacity: viewOpacity}]}>
                <View style={pageTitleContainer}>
                    <Text style={pageTitle}>Profile</Text>
                </View>
                {renderProfileView()}
            </Animated.View>
        </MainBackgroundContainer>
    )
}

const styles = StyleSheet.create({
    changePasswordButton: {
        width: '100%',
        height:  height * 0.075,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#f00',
        borderRadius: 5,

    },
    changePasswordRow: {
        width: '100%',
        marginTop: height * 0.03,
    },
    changePasswordText: {
        fontWeight: '900',
        fontSize: 20,
        color: '#fff',
    },
    emailLabel: {
        fontSize: height * 0.03,
        color: '#f00' ,
        fontWeight: '900',
        marginEnd: width * 0.01, 
    },
    greetingText: {
        color: '#f00',
        fontSize: height * 0.05,
        fontWeight: '900',
    },
    logoutButton: {
        width: '100%',
        height: height * 0.075,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutRow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.03,
    },
    logoutText: {
        color: '#f00',
        fontWeight: '900',
        fontSize: 20,
    },
    profileScreenContainer: {
        width: '100%',
        height: '100%',
    },
    timeBasedGreetingRow: {
        width: '100%',
        marginBottom: height * 0.03,
    },
    userEmail: {
        fontSize: height * 0.03,
        color: '#f00'
    },
    userEmailRow: {
        flexDirection: 'row',
    },
    userInfoContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 5,
        paddingHorizontal: height * 0.01,
        paddingVertical: height * 0.02,
        marginTop: height * 0.03,
    }
});

const mapStateToProps = state => {
    return {
        email: state.user.email,
        authenticationLoading: state.user.authenticationLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)