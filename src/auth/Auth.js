import React, { useEffect , useState} from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Auth = () => {
  const navigation = useNavigation();
  const [authChecked, setAuthChecked] = useState(false);

  const checkUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        // User data exists, navigate to home screen
        navigation.replace('Login');
      } else {
        // User data is empty, navigate to login screen
        navigation.replace('Home');
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
    <View style={{backgroundColor:'#000000', height:'100%'}}>
      <Text>Auth Loading Screen</Text>
      {/* You can add a loading spinner or other UI elements if needed */}
    </View>
  );
};

export default Auth;
