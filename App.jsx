import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Auth from './src/auth/Auth'
import Home from './src/screens/Home'
import Stats from './src/screens/Stats'
import Menu from './src/screens/Menu'
import BottomNavigation from './src/navigation/BottomNavigation'
import LoginScreen from './src/auth/LoginScreen'
import RegistrationScreen from './src/auth/RegistrationScreen'

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrationScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})