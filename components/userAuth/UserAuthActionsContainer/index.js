import React, { useRef, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, Animated, TouchableOpacity } from 'react-native';
import LoginForm from '../forms/LoginForm';
import SignUpForm from '../forms/SignUpForm';

const {height, width} = Dimensions.get('screen');

const UserAuthActionsContainer = () => {

    const viewOpacity = useRef(new Animated.Value(0)).current;

    const [display, setDisplay] = useState('')

    const renderDisplay = () => {
        if (display === "login") {
            return <LoginForm />
        } else if (display === 'signup') {
            return <SignUpForm />
        } else {
            return (
                <>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => setDisplay('login')} style={[styles.actionButton, styles.loginButton]}>
                            <Text style={[styles.actionButtonText, styles.loginText]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userAuthActionsTextRow}>
                        <Text style={styles.orText}>Or</Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => setDisplay('signup')} style={[styles.actionButton, styles.signUpButton]}>
                            <Text style={[styles.actionButtonText, styles.signUpText]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.descriptionRow}>
                        <Text style={styles.description}>To access features and enable saving.</Text>
                    </View>
                </>
            )
        }
    }

    const fadeViewIn = () => {
        Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 1250,
            useNativeDriver: true,
        }).start()
    }

    useEffect(() => {
        fadeViewIn();
    })

    return (
        <Animated.View style={[styles.userAuthActionsContainer, {opacity: viewOpacity}]}>
            {renderDisplay()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        width: '90%',
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: height * 0.02,
    },
    actionButtonText: {
        fontSize: height * 0.035,
        fontWeight: '900',
    },
    buttonRow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        color: '#fff',
        fontSize: height * 0.025,
    },
    descriptionRow: {
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    loginButton: {
        backgroundColor: '#fff',
        
    },
    loginText: {
        color: "#f00",
    },
    orText: {
        color: '#fff',
        fontSize: height * 0.035,
        fontWeight: '900',
    },
    signUpButton: {
        backgroundColor: '#f00',
    },
    signUpText: {
        color: '#fff',
    },
    userAuthActionsContainer: {
        marginTop: height * 0.07,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAuthActionsTextRow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.075,
    },
})

export default UserAuthActionsContainer