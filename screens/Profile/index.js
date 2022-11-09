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

    const userProfile = (
        <View style={styles.userProfileContainer}>
            <View style={styles.userInfoContainer}>

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
    logoutButton: {
        width: '80%',
        paddingVertical: height * 0.02,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: 'center'
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
    userInfoContainer: {
        width: '100%',
        height: height * 0.55,
        borderWidth: 1,
        borderColor: "#000",
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