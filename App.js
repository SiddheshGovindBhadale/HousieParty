import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from "react-redux";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import store from './src/store';
import StackNavigations from './src/navigation/StackNavigations';
import { colors } from './src/utils/Themes';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.DarkGray
    },
  };

  return (
    <Provider store={store}>
      <StatusBar hidden={true} translucent={true} backgroundColor={colors.DarkGray} />
      <NavigationContainer theme={MyTheme}>
        <SafeAreaView style={styles.safeArea}>
          <StackNavigations />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.DarkGray
  }
})