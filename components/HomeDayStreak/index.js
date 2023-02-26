import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const HomeDayStreak = () => {

    return (
        <View style>
            <View>
                <Text>Record Recorded</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeDayStreak);