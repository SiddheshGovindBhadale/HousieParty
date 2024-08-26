import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Auth from './src/auth/Auth'
import Home from './src/screens/Home'
import Stats from './src/screens/Stats'
import Menu from './src/screens/Menu'
import BottomNavigation from './src/navigation/BottomNavigation'
import Login from './src/auth/Login'
import Register from './src/auth/Register'
import ForgotPasswordScreen from './src/auth/ForgotPasswordScreen'
import ChangePassword from './src/auth/ChangePassword'
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen'
import Tambola from './src/screens/GameScreens/Tambola'

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tambola" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Tambola" component={Tambola} />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  )
}

export default App

const styles = StyleSheet.create({})