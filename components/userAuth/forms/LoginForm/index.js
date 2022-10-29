import React, {useRef, useEffect, useState} from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, TouchableOpacity, TextInput, Animated } from 'react-native';
const {height, width} = Dimensions.get('screen')
import {Ionicons} from 'react-native-vector-icons'

const LoginForm = () => {

    const viewOpacity = useRef(new Animated.Value(0)).current;
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [inputFocused, setInputFocused] = useState('');

    const fadeViewIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    const handleLoginPress = () => {
        if (loginEmail !== "" && loginPassword !== "") {
            // send request to login.
        }
    }

    const dynamicPasswordColor = () => {
        if (inputFocused === 'password') {
            return '#f00';
        } else {
            return '#ddd';
        }
    }

    const dynamicEmailColor = () => {
        if (inputFocused === 'email') {
            return '#f00';
        } else {
            return '#ddd';
        }
    }

    useEffect(() => {
        fadeViewIn()
    })

    const emailSelected = inputFocused === 'email' ?
    {
        backgroundColor: '#fff'
    }
    :
    {

    }

    const passwordSelected = inputFocused === 'password' ?
    {
        backgroundColor: '#fff',
    }
    :
    {

    }

    return (
        <View style={styles.loginFormContainer}>
            <View style={styles.formTitleRow}>
                <Text style={styles.formTitle}>Login</Text>
            </View>
            <View style={styles.loginForm}>
                <View style={[styles.formRow]}>
                    <View style={styles.formLabelRow}>
                        <Text style={styles.formLabel}>Email</Text>
                    </View>
                    <View style={[styles.formInputRow, emailSelected]}>
                        <Ionicons name="mail" size={24} color={dynamicEmailColor()} />
                        <TextInput onEndEditing={() => setInputFocused('')} onFocus={() => setInputFocused('email')} placeholder="jon@doe.com" textContentType='emailAddress' keyboardType='email-address' autoComplete='email' style={styles.formInput} value={loginEmail} onChangeText={(val) => setLoginEmail(val)} />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.formLabelRow}>
                        <Text style={styles.formLabel}>Password</Text>
                    </View>
                    <View style={[styles.formInputRow, passwordSelected]}>
                        <Ionicons name="lock-closed" size={24} color={dynamicPasswordColor()} />
                        <TextInput onEndEditing={() => setInputFocused('')} onFocus={() => setInputFocused('password')} placeholder='Password' textContentType='password' secureTextEntry={true} style={styles.formInput} value={loginPassword} onChangeText={(val) => setLoginPassword(val)} />
                    </View>
                </View>
            </View>
            <View style={styles.formButtonRow}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
                    <Text style={styles.loginButtonText}>Login</Text>
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
    loginButton: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: height * 0.02,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#f00',
        fontSize: height * 0.03,
        fontWeight: '900',
    },
    loginForm: {
    },
    loginFormContainer: {
        width: '80%',
    }
});

export default LoginForm