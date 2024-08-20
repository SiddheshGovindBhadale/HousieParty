import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import Stats from '../screens/Stats'
import Menu from '../screens/Menu'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const BottomNavigation = () => {

    const Tab = createBottomTabNavigator();

    const screenOptions = () => ({
        tabBarStyle: [
            {
                display: 'flex',
                paddingTop: 5,
                paddingBottom: 5,
                borderTopWidth: 0,
                height: 55,
                paddingHorizontal: 5,
                backgroundColor: '#FFFFFF'
            },
            null,
        ],
        tabBarShowLabel: true,
        tabBarInactiveTintColor: '#8E8E8E',
        tabBarActiveTintColor: '#FFCA28',
    });

    return (
        <Tab.Navigator
            screenOptions={screenOptions}
        >
            <Tab.Screen
                name="Dashboard"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name='view-dashboard' size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Stats"
                component={Stats}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name='trophy' size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name='user' size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})