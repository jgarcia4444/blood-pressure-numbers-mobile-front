import React from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import MainBackgroundContainer from '../../components/backgrounds';
import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles

const Profile = ({email}) => {

    return (
        <MainBackgroundContainer>
            <View style={styles.profileScreenContainer}>
                <View style={pageTitleContainer}>
                    <Text style={pageTitle}>Profile</Text>
                </View>
                {email === "" &&
                    <UserAuthActionsContainer />
                }
                <View style={styles.userInfoContainer}>

                </View>
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

export default connect(
    mapStateToProps,
    null
)(Profile)