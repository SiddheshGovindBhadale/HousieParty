import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'

const RegistrationScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reenteredPassword, setReenteredPassword] = useState('')

  const handleSubmit = () => {
    if (password !== reenteredPassword) {
      Alert.alert('Error', 'Passwords do not match!')
      return
    }
    Alert.alert('Success', 'Account created successfully!')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#555"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Re-enter Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={reenteredPassword}
          onChangeText={setReenteredPassword}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInContainer}>
        <Text style={styles.signInText}>Don't have an account? Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default RegistrationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFF10',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#383838', // Vibrant tomato color
  },
  inputContainer: {
    width: '85%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    color:'#000',
    padding: 12,
    marginBottom: 15,
    borderRadius: 7,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#29292933', // Coral border color
  },
  buttonContainer: {
    width: '85%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff4500', // OrangeRed color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#ff4500', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    marginTop: 25,
  },
  signInText: {
    color: '#1e90ff', // DodgerBlue color
    fontSize: 16,
    textDecorationLine: 'underline',
  },
})
