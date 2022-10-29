import React , {useRef, useEffect, useState}from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, Animated, TouchableOpacity, TextInput } from 'react-native';
const {height, width} = Dimensions.get('screen');

import {Ionicons} from 'react-native-vector-icons'

const SignUpForm = () => {
    const viewOpacity = useRef(new Animated.Value(0)).current;
    const [signUpEmail, setsignUpEmail] = useState('');
    const [signUpPassword, setsignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
    const [inputFocused, setInputFocused] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const fadeViewIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    const handleSignUpPress = () => {
        if (signUpEmail !== "" && signUpPassword !== "" && signUpConfirmPassword !== "") {
            if (signUpConfirmPassword === signUpPassword) {
                // send user info to backend
            } else {
                setPasswordError('Password and confirm password do not match.');
                setConfirmError('Password and confirm password do not match.');
            }
        }
    }

    const dynamicIconColor = (input) => {
        if (input === inputFocused) {
            return '#f00';
        }
        return '#ddd';
    }

    useEffect(() => {
        fadeViewIn()
    })

    const inputHighlighted = (inputName) => {
        if (inputName === inputFocused) {
            return {
                backgroundColor: '#fff',
            }
        }
        return {

        }
    }

    return (
        <View style={styles.signUpFormContainer}>
            <View style={styles.formTitleRow}>
                <Text style={styles.formTitle}>Sign Up</Text>
            </View>
            <View style={styles.signUpForm}>
                <View style={[styles.formRow]}>
                    <View style={styles.formLabelRow}>
                        <Text style={styles.formLabel}>Email</Text>
                    </View>
                    <View style={[styles.formInputRow, inputHighlighted('email')]}>
                        <Ionicons name="mail" size={24} color={dynamicIconColor('email')} />
                        <TextInput onEndEditing={() => setInputFocused('')} onFocus={() => setInputFocused('email')} placeholder="jon@doe.com" textContentType='emailAddress' keyboardType='email-address' autoComplete='email' style={styles.formInput} value={signUpEmail} onChangeText={(val) => setsignUpEmail(val)} />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.formLabelRow}>
                        <Text style={styles.formLabel}>Password</Text>
                    </View>
                    <View style={[styles.formInputRow, inputHighlighted('password')]}>
                        <Ionicons name="lock-closed" size={24} color={dynamicIconColor('password')} />
                        <TextInput onEndEditing={() => setInputFocused('')} onFocus={() => setInputFocused('password')} placeholder='Password' textContentType='password' secureTextEntry={true} style={styles.formInput} value={signUpPassword} onChangeText={(val) => setsignUpPassword(val)} />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.formLabelRow}>
                        <Text style={styles.formLabel}>Confirm Password</Text>
                    </View>
                    <View style={[styles.formInputRow, inputHighlighted('confirm')]}>
                        <Ionicons name="lock-closed" size={24} color={dynamicIconColor('confirm')} />
                        <TextInput onEndEditing={() => setInputFocused('')} onFocus={() => setInputFocused('confirm')} placeholder='Confirm Password' textContentType='password' secureTextEntry={true} style={styles.formInput} value={signUpConfirmPassword} onChangeText={(val) => setSignUpConfirmPassword(val)} />
                    </View>
                </View>
            </View>
            <View style={styles.formButtonRow}>
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formLabel: {
        color: '#fff',
        fontSize: height * 0.03,
    },
    formLabelRow: {

    },
    formInput: {
        flex: 1,
        marginStart: width * 0.01,
        color: '#f00',
    },
    formInputRow: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        paddingHorizontal: width * 0.025,
        paddingVertical: height * 0.0075,
        borderRadius: 5,
    },
    formRow: {
        marginBottom: height * 0.04,
    },
    formTitle: {
        fontSize: height * 0.05,
        color: '#fff',
        fontWeight: '900',
    },
    formTitleRow: {
        width: '100%',
    },
    signUpButton: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: height * 0.02,
        borderRadius: 5,
        alignItems: 'center',
    },
    signUpButtonText: {
        color: '#f00',
        fontSize: height * 0.03,
        fontWeight: '900',
    },
    signUpForm: {
    },
    signUpFormContainer: {
        width: '80%',
    }
});

export default SignUpForm