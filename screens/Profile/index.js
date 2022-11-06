import React from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles

import MainBackgroundContainer from '../../components/backgrounds';
import UserAuthActionsContainer from '../../components/userAuth/UserAuthActionsContainer';
import logoutUser from '../../redux/actions/userActions/logoutUser';

const Profile = ({email, logoutUser}) => {

    const userProfile = (
        <View style={styles.userProfileContainer}>
            <View style={styles.userInfoContainer}>

            </View>
            <View style={styles.logoutRow}>
                <TouchableOpacity onPress={logoutUser} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
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
    profileScreenContainer: {
        width: '100%',
        height: '100%',
    }
});

const mapStateToProps = state => {
    return {
        email: state.user.email,
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