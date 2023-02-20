import React, {useEffect, useRef, useState,} from 'react'
import { Animated, View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
const {height, width} = Dimensions.get('screen');
import { connect } from 'react-redux';

import globalStyles from '../../config/styles/globalStyles';
const {pageTitleContainer, pageTitle, platformShadow} = globalStyles

import MainBackgroundContainer from '../../components/backgrounds';
import UserAuthActionsContainer from '../../components/userAuth/UserAuthActionsContainer';
import logoutUser from '../../redux/actions/userActions/logoutUser';
import changePassword from '../../redux/actions/userActions/changePassword';
import sendVerificationCode from '../../redux/actions/userActions/sendVerificationCode';
import updatePassword from '../../redux/actions/userActions/updatePassword';

const Profile = ({resetPasswordDisplay, passwordMinLengthError, updatePassword, sendVerificationCode, route, user, logoutUser, authenticationLoading, changePassword}) => {

    let navState = route.params === undefined ? "" : route.params.navState;

    const {email, userId, passwordChangeInfo} = user;
    const {passwordDisplay, codeSending, verificationProcessing, updatingPassword, passwordUpdateError, codeVerificationError} = passwordChangeInfo;
    
    const viewOpacity = useRef(new Animated.Value(0)).current;
    const successOpacity = useRef(new Animated.Value(1)).current;

    const [otaCode, setOtaCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

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

    const handleOtaCodeChange = val => {
        setOtaCode(val);
        if (val.split('').length === 6) {
            let codeInformation = {
                userId: userId,
                otaCode: val,
            }
            sendVerificationCode(codeInformation);
            if (codeVerificationError === "") {
                setOtaCode('');
            }
        }
    }

    const handleVerifyCodePress = () => {
        if (verificationProcessing === false) {
            let codeInformation = {
                userId: userId,
                otaCode: otaCode,
            }
            sendVerificationCode(codeInformation);
            if (codeVerificationError === "") {
                setOtaCode('');
            }
        }
    }

    const handleUpdatePasswordPress = () => {
        if (newPassword.split('').length > 7) {
            let newPasswordInformation = {userId, newPassword};
            updatePassword(newPasswordInformation);
            if (passwordUpdateError === "") {
                setNewPassword('');
            }
        } else {
            passwordMinLengthError()
        }
    }

    const changePasswordButton = (
        <TouchableOpacity onPress={handleChangePasswordPress} style={styles.changePasswordButton}>
            {codeSending === true ?
                <ActivityIndicator color={'#fff'} size='large' />
            :
                <Text style={styles.changePasswordText}>Change Password</Text>
            }
        </TouchableOpacity>            
    )

    const codeInput = (
        <View style={styles.codeInputContainer}>
            <View style={styles.codeInputRow}>
                {codeVerificationError !== "" &&
                    <Text style={styles.passwordChangeError}>{codeVerificationError}</Text>
                }
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
                <TouchableOpacity onPress={handleVerifyCodePress} style={[platformShadow, styles.verifyCodeButton]}>
                    {verificationProcessing === true ?
                        <ActivityIndicator color={'#fff'} size={'large'} />
                    :
                        <Text style={styles.verifyCodeText}>Send Code</Text>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.codeInputdescriptionRow}>
                <Text style={styles.codeInputDescription}>An email has been sent to the email associated with this account. Use the code in the email to continue the process of updating your password</Text>
            </View>
        </View>
    )

    const changePasswordInput = (
        <View style={styles.changePasswordContainer}>
            {passwordUpdateError !== "" &&
                <Text style={styles.passwordChangeError}>{passwordUpdateError}</Text>
            }
            <TextInput 
                style={styles.updatePasswordInput}
                value={newPassword}
                onChangeText={val => setNewPassword(val)}
                placeholder={'Enter New Password'}
                placeholderTextColor={'#fff'}
            />
            <TouchableOpacity onPress={handleUpdatePasswordPress} style={[platformShadow, styles.updatePasswordButton]}>
                {updatingPassword === true ?
                    <ActivityIndicator color={'#fff'} size='large' />
                :
                    <Text style={styles.updatePasswordButtonText}>Update Password</Text>
                }
            </TouchableOpacity>
        </View>
    )

    const sucessMessage = (
        <Animated.View style={[styles.successContainer, {opacity: successOpacity}]}>
            <Text style={styles.successText}>Your Password has been updated.</Text>
        </Animated.View>
    )

    const renderPasswordDisplay = () => {
        if (passwordDisplay === 'code') {
            return codeInput;
        } else if (passwordDisplay === 'change_password') {
            return changePasswordInput;
        } else if (passwordDisplay === 'password_updated') {
            return sucessMessage;
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

    const fadeOutSuccess = () => {
        Animated.timing(successOpacity, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true
        }).start(() => {
            resetPasswordDisplay();
        })
    }

    useEffect(() => {
        fadeViewIn()
        if (passwordDisplay === "password_updated") {
            fadeOutSuccess()
        }
    },[passwordDisplay])

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
    changePasswordContainer: {
        width: '100%',
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
    codeInputDescription: {
        color: '#f00',
        fontWeight: 'bold'
    },
    codeInputdescriptionRow: {
        marginTop: height * 0.02,
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
    passwordChangeError: {
        color: '#fff',
        fontWeight: '100',
    },
    profileScreenContainer: {
        width: '100%',
        height: '100%',
    },
    successContainer: {
        width: '100%',
    },
    successText: {
        color: "#f00",
        fontWeight: 'bold',
        fontSize: height * 0.03,
    },
    timeBasedGreetingRow: {
        width: '100%',
        marginBottom: height * 0.03,
    },
    updatePasswordButton: {
        width: '100%',
        height:  height * 0.075,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#f00',
        borderRadius: 5,
    },
    updatePasswordButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    updatePasswordInput: {
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
        updatePassword: (updatePasswordInfo) => dispatch(updatePassword(updatePasswordInfo)),
        passwordMinLengthError: () => dispatch({type: "PASSWORD_UPDATE_ERROR", message: "Password must be at least 8 characters long."}),
        resetPasswordDisplay: () => dispatch({type: "RESET_PASSWORD_DISPLAY"}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)