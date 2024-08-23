import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar'; // Import ProgressBar
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    let progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 1 ? prev + 0.01 : 1));
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(progressInterval);
      navigation.replace('Auth'); // Navigate to the home screen
    }, 5000); // 5-second delay

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon/logo.png')} // Replace with your logo URL
        style={styles.logo}
      />
      <Text style={styles.loadingText}>Loading...</Text>
      <ProgressBar
        progress={progress}
        width={200}
        color="#f7ac01"
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#ecf0f1',
    marginBottom: 15,
  },
  progressBar: {
    marginTop: 0,
  },
});

export default LoadingScreen;
