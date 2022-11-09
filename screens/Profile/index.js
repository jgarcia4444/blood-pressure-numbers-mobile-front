import React from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
const {height, width} = Dimensions.get('screen');
import { connect } from 'react-redux';

import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles

import MainBackgroundContainer from '../../components/backgrounds';
import UserAuthActionsContainer from '../../components/userAuth/UserAuthActionsContainer';
import logoutUser from '../../redux/actions/userActions/logoutUser';

const Profile = ({email, logoutUser, authenticationLoading}) => {

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

    const userProfile = (
        <View style={styles.userProfileContainer}>
            <View style={styles.userInfoContainer}>
                {renderGreeting()}
                <View style={styles.userEmailRow}>
                    <Text style={styles.emailLabel}>Email:</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
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

    return (
        <MainBackgroundContainer>
            <View style={styles.profileScreenContainer}>
                <View style={pageTitleContainer}>
                    <Text style={pageTitle}>Profile</Text>
                </View>
                {renderProfileView()}
            </View>
        </MainBackgroundContainer>
    )
}

const styles = StyleSheet.create({
    emailLabel: {
        fontSize: height * 0.025,
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
        height: height * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: height * 0.025,
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