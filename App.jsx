import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Auth from './src/auth/Auth'
import Home from './src/screens/Home'
import Stats from './src/screens/Stats'
import Menu from './src/screens/Menu'
import BottomNavigation from './src/navigation/BottomNavigation'
<<<<<<< HEAD
import LoginScreen from './src/auth/LoginScreen'
import RegistrationScreen from './src/auth/RegistrationScreen'
import ForgetPassword from './src/auth/ForgetPassword'
=======
import Login from './src/auth/Login'
import Register from './src/auth/Register'
import ForgotPasswordScreen from './src/auth/ForgotPasswordScreen'
import ChangePassword from './src/auth/ChangePassword'
>>>>>>> 5a279dcf79335e22359512d064d9ada4003a8a35

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="RegistrationScreen" screenOptions={{ headerShown: false }}>
=======
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
>>>>>>> 5a279dcf79335e22359512d064d9ada4003a8a35
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Menu" component={Menu} />
<<<<<<< HEAD
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
=======
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
>>>>>>> 5a279dcf79335e22359512d064d9ada4003a8a35
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})