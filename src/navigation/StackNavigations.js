import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Auth from "../auth/Auth";
import BottomNavigation from "./BottomNavigation";
import Home from "../screens/Home";
import Stats from "../screens/Stats";
import Menu from "../screens/Menu";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPasswordScreen from "../auth/ForgotPasswordScreen";
import ChangePassword from "../auth/ChangePassword";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { colors, flex } from "../utils/Themes";
import LobbyScreen from "../screens/LobbyScreen";

const Stack = createNativeStackNavigator();
const StackNavigations = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
                <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Stats" component={Stats} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            </Stack.Navigator>
        </SafeAreaView>
    );
};

export default StackNavigations;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.DarkGray,
        flex: flex.flex,
    },
});
