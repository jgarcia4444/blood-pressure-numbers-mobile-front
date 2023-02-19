import React, {useEffect, useRef, useState,} from 'react'
import { Animated, View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
const {height, width} = Dimensions.get('screen');
import { connect } from 'react-redux';

import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle} = globalStyles

import MainBackgroundContainer from '../../components/backgrounds';
import UserAuthActionsContainer from '../../components/userAuth/UserAuthActionsContainer';
import logoutUser from '../../redux/actions/userActions/logoutUser';
import changePassword from '../../redux/actions/userActions/changePassword';
import sendVerificationCode from '../../redux/actions/userActions/sendVerificationCode';

const Profile = ({sendVerificationCode, route, user, logoutUser, authenticationLoading, changePassword}) => {

    let navState = route.params === undefined ? "" : route.params.navState;

    const {email, userId, passwordChangeInfo} = user;
    const {passwordDisplay, codeSending, verificationProcessing} = passwordChangeInfo;
    
    const viewOpacity = useRef(new Animated.Value(0)).current;

    const [otaCode, setOtaCode] = useState('');

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

    const handleChangePasswordPress = () => {
        changePassword(userId);
    }

    const changePasswordButton = (
        <TouchableOpacity onPress={handleChangePasswordPress} style={styles.changePasswordButton}>
            <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>            
    )

    const handleOtaCodeChange = val => {
        setOtaCode(val);
        if (val.length === 6) {
            let codeInformation = {
                userId: userId,
                otaCode: otaCode,
            }
            sendVerificationCode(codeInformation);
        }
    }

    const handleVerifyCodePress = () => {
        if (verificationProcessing === false) {
            let codeInformation = {
                userId: userId,
                otaCode: otaCode,
            }
            sendVerificationCode(codeInformation);
        }
    }

    const codeInput = (
        <View style={styles.codeInputContainer}>
            <View style={styles.codeInputRow}>
                <TextInput 
                    style={styles.codeInput} 
                    value={otaCode}
                    onChangeText={handleOtaCodeChange}
                    placeholder={'Enter Verification Code'}
                    placeholderTextColor={'#fff'}
                    keyboardType='number-pad'
                    
                />
            </View>
            <View style={styles.codeInputSubmitRow}>
                <TouchableOpacity onPress={handleVerifyCodePress} style={styles.verifyCodeButton}>
                    {codeSending === true ?
                        <ActivityIndicator color={'#fff'} size={'large'} />
                    :
                        <Text style={styles.verifyCodeText}>Send Code</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )

    const renderPasswordDisplay = () => {
        if (passwordDisplay === 'code') {
            return codeInput;
        } else if (passwordDisplay === 'change_password') {
            return <Text>Change Password</Text>
        } else {
            return changePasswordButton;
        }
    }

    const userProfile = (
        <View style={styles.userProfileContainer}>
            <View style={styles.userInfoContainer}>
                {renderGreeting()}
                <View style={styles.userEmailRow}>
                    <Text style={styles.emailLabel}>Email:</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
                <View style={styles.changePasswordRow}>
                    {renderPasswordDisplay()}
                </View>
                
            </View>
            <View style={styles.logoutRow}>
                {logoutButton}
            </View>
        </View>
    )

    const renderProfileView = () => {
        return email === "" ?
            <UserAuthActionsContainer navState={navState !== undefined ? navState : ""} />
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
    },)

    return (
        <MainBackgroundContainer>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={[styles.profileScreenContainer, {opacity: viewOpacity}]}>
                    <View style={pageTitleContainer}>
                        <Text style={pageTitle}>Profile</Text>
                    </View>
                    {renderProfileView()}
                </Animated.View>
            </TouchableWithoutFeedback>
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
    codeInput: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#f00',
        height: height * 0.05,
        marginBottom: height * 0.02,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
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
    },
    verifyCodeButton: {
        width: '100%',
        height:  height * 0.075,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#f00',
        borderRadius: 5,
    },
    verifyCodeText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

const mapStateToProps = state => {
    return {
        user: state.user,
        authenticationLoading: state.user.authenticationLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        changePassword: userId => dispatch(changePassword(userId)),
        sendVerificationCode: codeInformation => dispatch(sendVerificationCode(codeInformation)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)