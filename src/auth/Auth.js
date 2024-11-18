import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/UserSlice';
import { colors } from '../utils/Themes';

const Auth = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [authChecked, setAuthChecked] = useState(false);

  const checkUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        navigation.replace('Login');
      } else {
        let user = JSON.parse(userData)
        dispatch(setUserData(user))
        navigation.replace('LobbyScreen');
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    } finally {
      setAuthChecked(true);
    }
  };
  checkUserData();

  if (!authChecked) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}></SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DarkGray,
    height: '100%'
  }
})
