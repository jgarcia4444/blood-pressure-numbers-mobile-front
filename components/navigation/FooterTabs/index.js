import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../../screens/Home';
import AddRecord from '../../../screens/AddRecord';
import Records from '../../../screens/Records';
import {Ionicons} from 'react-native-vector-icons';

const FooterTabs = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'rgba(255, 40, 40, 1.0)',
                },
                tabBarActiveTintColor: "#000",
                tabBarInactiveTintColor: "#fff",
                tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.5)',
                tabBarLabelPosition: 'below-icon',
            }}
        >
            <Tab.Screen
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon: ({focused, color, size}) => <Ionicons name="home" size={focused === true ? 32 : 24} color={focused === true ? "#000" : "#fff"} />,
                    title: "Home",
                }} 
            />
            <Tab.Screen 
                name="AddRecord" 
                component={AddRecord}
                options={{
                    tabBarIcon: ({focused, color, size}) => <Ionicons name="add-circle" size={focused === true ? 32 : 24} color={focused === true ? "#000" : "#fff"} />,
                    title: "Add",
                }} 
            />
            <Tab.Screen 
                name="Records" 
                component={Records}
                options={{
                    tabBarIcon: ({focused, color, size}) => <Ionicons name="bookmarks" size={focused === true ? 32 : 24} color={focused === true ? "#000" : "#fff"} />,
                    title: "Records",
                }} 
            />
        </Tab.Navigator>
    )
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
})

export default FooterTabs;
