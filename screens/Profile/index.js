import React from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';

import MainBackgroundContainer from '../../components/backgrounds';
import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles

const Profile = () => {

    return (
        <MainBackgroundContainer>
            <View style={styles.profileScreenContainer}>
                <View style={pageTitleContainer}>
                    <Text style={pageTitle}>Profile</Text>
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

export default Profile