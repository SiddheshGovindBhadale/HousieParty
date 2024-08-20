import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from "react-native-vector-icons/AntDesign"

const ForgetPassword = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <AntDesign name="left" size={25} color={'#212121'} />
        </TouchableOpacity>
        <Text style={styles.headTxt}>Forgot Password</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require('../assets/forget_pwd.png')}
          />
        </View>
        <Text style={styles.text}>Forgot Your Password?</Text>
        <Text style={styles.subText}>
          Don't worry! Just fill in your email and we'll send you a link to reset your password.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TextInput
          style={styles.inputText}
          placeholder='Enter your registered email'
          placeholderTextColor={"#777"}
        />
        <TouchableOpacity style={styles.sendOtpBtn}>
          <Text style={styles.sendOtp}>SEND OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    shadowColor: '#2F2F2F000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headTxt: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',    
  },
  section: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 100,
  },
  imgContainer: {
    height: 200,
    width: 200,
    overflow: 'hidden',
    borderRadius: 100,
    marginBottom: 40,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Darker text color
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#555', // Subtle text color
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 25,
    fontSize: 16,
  },
  sendOtpBtn: {
    backgroundColor: "#FFCA28",
    paddingVertical: 15,
    borderRadius: 7,
    marginTop: 10,
  },
  sendOtp: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
    fontSize: 14,
    textTransform:'capitalize'
  },
  bottomSection: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
})
