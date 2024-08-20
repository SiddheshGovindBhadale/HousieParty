import { ImageBackground, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegistrationScreen = () => {
  const [username,setUsername]=useState('')
  const[email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [reenteredPassword,setReenteredPassword]=useState('')


  return (
    <SafeAreaView>
      <View style={styles.MainContainer}>
        <ImageBackground style={styles.BgImg} source={require('../assests/login_bg.png')}>
          <View style={styles.signUp_container}>
            <View >
              <Text style={styles.SignUptxt}>SignUp</Text>
            </View>
            <View style={styles.InputContainer}>
              <Text style={styles.label}>Username </Text>
              <TextInput style={styles.input}
                placeholder='Enter your name'
                value={username}
                onChange={setUsername}
                placeholderTextColor={'#212121'}
              />
              <Text style={styles.label}>Email </Text>
              <TextInput style={styles.input}
              keyboardType="email-address"
                placeholder='Enter your email'
                value={email}
                onChange={setEmail}
                placeholderTextColor={'#212121'}
              />
              <Text style={styles.label}>Password </Text>
              <TextInput style={styles.input}
                placeholder='Enter the password'
                value={password}
                onChange={setPassword}
                placeholderTextColor={'#212121'}
              />
              <Text style={styles.label}>Confirm password </Text>
              <TextInput style={styles.input}
                placeholder='Re-enter password'
                value={reenteredPassword}
                onChange={setReenteredPassword}
                placeholderTextColor={'#212121'}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.submitBtn}>
                <Text style={styles.submit}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.BottomText}>
              <Text style={styles.DnAccText}>Already have an account? </Text>
              <TouchableOpacity>
              <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default RegistrationScreen

const styles = StyleSheet.create({
  MainContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  BgImg: {
    flex: 1,
  },
  signUp_container: {
    marginTop:60,
    paddingHorizontal:20,


  },
  SignUptxt: {
    color: '#FFCA28',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom:15,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 7,
    marginBottom: 10,
    color: '#000',
    paddingHorizontal:15,
    fontSize:13,

  },
  submitBtn: {
    backgroundColor: "#FFCA28",
    paddingVertical:12,
    borderRadius: 7,
    marginTop:15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submit: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: '600',
    textTransform:'capitalize',
    color: '#FFFFFF'
  },
  BottomText: {
    justifyContent:'center',
    flexDirection:'row',
    marginTop:15
  },
  
  signInText: {
    color:"#FFCA28",
    fontWeight:'600',

  }, 
  label:{
    fontSize:13,
    fontWeight:"500",
    color:'#FFCA28',
    marginBottom:7,
  }
})