import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../../screens/Home';
import AddRecord from '../../../screens/AddRecord';
import Records from '../../../screens/Records';
import {Ionicons} from 'react-native-vector-icons'

const FooterTabs = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon: ({tintColor}) => <Ionicons name="home" size={32} color={"#f00"} />
                }} 
            />
            <Tab.Screen 
                name="Add Record" 
                component={AddRecord}
                options={{
                    tabBarIcon: ({tintColor}) => <Ionicons name="add-circle" size={32} color={"#f00"} />
                }} 
            />
            <Tab.Screen 
                name="Records" 
                component={Records}
                options={{
                    tabBarIcon: ({tintColor}) => <Ionicons name="bookmarks" size={32} color={"#f00"} />
                }} 
            />
        </Tab.Navigator>
    )
}

export default FooterTabs;
