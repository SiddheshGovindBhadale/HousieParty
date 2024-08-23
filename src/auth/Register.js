import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Dimensions, StyleSheet, SafeAreaView, ScrollView, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail, validatePassword } from '../utils/utils';
import Config from 'react-native-config';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

const API_BASE_URL = 'https://digital-wellbing-api.onrender.com';
// const API_BASE_URL = 'http://192.168.32.140:5000'; 

const Register = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passVisibility, setPassVisibility] = useState(false);
    const screenHeight = Dimensions.get('window').height;

    const showToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const handleRegister = async () => {
        if (!name || !validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
            showToast('Invalid Input, Please enter valid details.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${Config.API_URL}/register`, {
                name,
                email,
                password,
            });

            if (response && response.data) {
                const { userData } = response.data;
                showToast('Registration Succesfull!');
                setLoading(false);
                navigation.navigate('Login');
            } else {
                setLoading(false);
                showToast('Registration Failed', 'Invalid response from the server');
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            showToast('Registration Failed', error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#212121', height: '100%' }}>
            <ScrollView>
                <View style={[styles.mainContainer, { height: screenHeight }]}>
                    <View style={styles.bottom_section}>
                        <View style={styles.form}>
                            <View style={styles.loginHeader}>
                                <Text style={styles.loginHeaderText}>Register</Text>
                            </View>
                            <View style={styles.formContainer}>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <View style={{ width: '48%' }}>
                                        <View style={styles.input_section}>
                                            {/* <Text style={styles.text}>Name</Text> */}
                                            <FontAwesome name='user' size={20} color={'#f7ac01'} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter your name'
                                                placeholderTextColor={"#F2F2F2"}
                                                value={name}
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                onChangeText={setName}
                                            />
                                        </View>

                                        <View style={styles.input_section}>
                                            {/* <Text style={styles.text}>Email</Text> */}
                                            <MaterialCommunityIcons name='email' size={20} color={'#f7ac01'} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Enter your email'
                                                placeholderTextColor={"#F2F2F2"}
                                                value={email}
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                onChangeText={setEmail}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '50%' }}>
                                        <View style={[styles.input_section, { paddingRight: 10 }]}>
                                            {/* <Text style={styles.text}>Password</Text> */}
                                            <Fontisto name='key' size={18} color={'#f7ac01'} />
                                            <TextInput
                                                style={[styles.input, { width: '79%' }]}
                                                placeholder='Create password'
                                                placeholderTextColor={"#F2F2F2"}
                                                value={password}
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                onChangeText={setPassword}
                                                secureTextEntry={!passVisibility}
                                            />
                                            <TouchableOpacity onPress={() => { setPassVisibility(!passVisibility) }}>
                                                {!passVisibility ? (
                                                    <Ionicons name='eye-off' size={20} color={'#f7ac01'} />
                                                ) : (
                                                    <Ionicons name='eye' size={20} color={'#f7ac01'} />
                                                )}
                                            </TouchableOpacity>
                                        </View>

                                        <View style={[styles.input_section, { paddingRight: 10 }]}>
                                            {/* <Text style={styles.text}>Confirm Password</Text> */}
                                            <MaterialCommunityIcons name='lock-check' size={20} color={'#f7ac01'} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder='Re-enter password'
                                                placeholderTextColor={"#F2F2F2"}
                                                value={confirmPassword}
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                onChangeText={setConfirmPassword}
                                                secureTextEntry={!passVisibility}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.button_wrapper}>
                                    <View style={styles.wrapper}>
                                        {loading ? (
                                            <ActivityIndicator size="large" color="#f7ac01" />
                                        ) : (
                                            <TouchableOpacity style={styles.button} onPress={handleRegister} >
                                                <Text style={styles.button_text}>Register</Text>
                                            </TouchableOpacity>
                                        )}
                                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                                            <Text style={styles.button_text}>Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    logoContainer: {
        width: '47%',
        height: 270,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50,
        alignSelf: 'center'
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    heading: {
        color: '#1E293B',
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 60,
    },
    bottom_section: {
        paddingHorizontal: 31,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    form: {
        // marginTop:80,
        // borderWidth: 1,
        // borderColor: 'red',
        width: 600,
        // paddingHorizontal: 40,
        // paddingVertical: 40,
        borderRadius: 10
    },
    loginHeader: {
        paddingVertical: 7,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7ac01',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    loginHeaderText: {
        fontSize: 13.5,
        fontWeight: '700',
        color: '#ffffff'
    },
    formContainer: {
        borderWidth: 1,
        borderColor: '#f7ac01',
        paddingVertical: 25,
        paddingHorizontal: 25,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4
    },
    input_section: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#444444',
        marginBottom: 10,
        width: '100%',
        paddingLeft: 10,
        borderRadius: 4
    },
    text: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 1,
    },
    input: {
        color: '#F2F2F2',
        borderRadius: 4,
        backgroundColor: '#444444',
        width: '90%',
        fontSize: 12,
        fontWeight: '400',
        paddingVertical: 6,
        // borderWidth:1,
        // borderColor:'red'
    },
    forgetButton: {
        marginBottom: 10,
        width: '100%'
    },
    forgetButtonText: {
        textAlign: 'right',
        color: '#f7ac01',
        fontSize: 12
    },
    button_wrapper: {
        marginTop: 5
    },
    wrapper: {
        flexDirection: 'row',
        borderColor: 'red',
        gap: 10,
        justifyContent: 'flex-end',
        width: '100%'
    },
    button: {
        borderRadius: 3,
        backgroundColor: '#f7ac01',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 25,
    },
    button_text: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'capitalize'
    },
    change_page: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text2: {
        color: '#828282',
    },
    button_text2: {
        color: '#f7ac01',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize'
    },
    other_text: {
        color: '#828282',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 12,
    },
    other_button: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 30,
        marginBottom: 20,
        marginTop: 10
    },
    icon_button: {
        width: 55,
        height: 55,
        borderWidth: 1,
        borderColor: '#444444',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    icon_button_text: {
        color: '#f7ac01',
        fontSize: 14,
        fontWeight: '400'
    }
});

export default Register;
