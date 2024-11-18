import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, flex } from '../utils/Themes'

const { width, height } = Dimensions.get('window');

const LobbyScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>

        </SafeAreaView>
    )
}

export default LobbyScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: flex.flex,
        backgroundColor: colors.DarkGray,
    },
})