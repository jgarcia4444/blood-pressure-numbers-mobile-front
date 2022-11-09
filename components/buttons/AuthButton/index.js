import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
const {height, width} = Dimensions.get('screen');
import { useSelector } from 'react-redux';


const AuthButton = ({buttonText, handleButtonPress}) => {

    const authLoading = useSelector(state => state.users.authenticationLoading);

    return (
        <TouchableOpacity style={styles.authButton} onPress={handleButtonPress}>
            {authLoading === true ?
            <ActivityIndicator color={'#f00'} size="large" />
            :
            <Text style={styles.authButtonText}>{buttonText}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    authButton: {

    },
    authButtonText: {
        color: '#f00',
        fontSize: 20,
        fontWeight: '900',
    }
})

export default AuthButton;