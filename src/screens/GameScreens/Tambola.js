import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');
const couponWidth = width * 0.7; // Adjust the coupon width relative to the screen size

const TambolaCoupon = () => {
    // Placeholder data for the 3x9 coupon grid
    const couponData = [
        [8, 13, 0, 28, 0, 40, 53, 0, 75],
        [0, 22, 37, 0, 54, 0, 63, 70, 0],
        [3, 0, 0, 49, 0, 66, 0, 77, 90]
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Top Player Section */}
                <View style={styles.playerSection}>
                    <View style={styles.playerRow}>
                        <Image style={styles.playerImage} source={require('../../assets/icon/user.png')} />
                        <Text style={styles.playerText}>Player 1</Text>
                    </View>
                    <View style={styles.playerRow}>
                        <Image style={styles.playerImage} source={require('../../assets/icon/user.png')} />
                        <Text style={styles.playerText}>Player 2</Text>
                    </View>
                    <View style={styles.playerRow}>
                        <Image style={styles.playerImage} source={require('../../assets/icon/user.png')} />
                        <Text style={styles.playerText}>Player 3</Text>
                    </View>
                    <View style={styles.playerRow}>
                        <Image style={styles.playerImage} source={require('../../assets/icon/user.png')} />
                        <Text style={styles.playerText}>Player 4</Text>
                    </View>
                </View>

                {/* Numbers and Coupon Grid Section */}
                <View style={styles.numbersCouponContainer}>
                    {/* Number Container */}
                    <View style={styles.numContainer}>
                        <ScrollView horizontal={true}>
                            <View style={styles.numberRow}>
                                {couponData.flat().map((num, index) => (
                                    <Text key={index} style={styles.numberText}>{num !== 0 ? num : ''}</Text>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    {/* Coupon Grid */}
                    <View style={styles.couponContainer}>
                        {couponData.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.gridRow}>
                                {row.map((num, colIndex) => (
                                    <View
                                        key={colIndex}
                                        style={[
                                            styles.gridCell,
                                            num === 0 ? styles.emptyCell : styles.filledCell,
                                        ]}
                                    >
                                        <Text style={styles.cellText}>{num !== 0 ? num : ''}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                    {/* Button Section */}
                    <View style={styles.buttonSection}>
                        <TouchableOpacity style={styles.gameButton}>
                            <Text style={styles.buttonText}>First Five</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gameButton}>
                            <Text style={styles.buttonText}>Third Row</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gameButton}>
                            <Text style={styles.buttonText}>Second Row</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gameButton}>
                            <Text style={styles.buttonText}>First Row</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TambolaCoupon;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#212121',
    },
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row'
    },
    playerSection: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
    },
    playerRow: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        padding: 5,
        borderRadius: 8,
    },
    playerImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    playerText: {
        fontSize: 16,
        color: '#FFD700',
        marginTop: 5,
    },
    numbersCouponContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    numContainer: {
        height: 80,
        
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
        width: couponWidth, // Ensure it matches the width of the coupon grid
    },
    numberRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberText: {
        fontSize: 18,
        color: '#FFD700',
        marginHorizontal: 5,
    },
    couponContainer: {
        width: couponWidth,
        padding: 10,
        backgroundColor: '#FFD700',
        borderRadius: 10,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    gridCell: {
        height: 40,
        width: (couponWidth / 9) - 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000000', // DeepPink
        marginHorizontal: 1,
        borderRadius: 5,
    },
    filledCell: {
        backgroundColor: '#448AFF',
    },
    emptyCell: {
        backgroundColor: '#FFD700',
    },
    cellText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    buttonSection: {
        flexDirection: 'row',
        width:couponWidth,
        justifyContent: 'space-evenly',
        paddingVertical:10,
        paddingHorizontal:15,
       // DarkOrange
        borderRadius: 8,
    },
    gameButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#4B0082', // Indigo
    },
    buttonText: {
        color: '#212121',
        fontWeight: 'bold',
    },
});
