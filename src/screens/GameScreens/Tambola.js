import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/dist/Feather';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const couponWidth = width * 0.7; // Adjust the coupon width relative to the screen size

const Tambola = () => {
    const couponData = [
        [8, 13, 0, 28, 0, 40, 53, 0, 75],
        [0, 22, 37, 0, 54, 0, 63, 70, 0],
        [3, 0, 0, 49, 0, 66, 0, 77, 90]
    ];

    const [calledNumbers, setCalledNumbers] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(null);
    const [touchedNumbers, setTouchedNumbers] = useState(new Set());

    useEffect(() => {
        const intervalId = setInterval(() => {
            generateRandomNumber();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [calledNumbers]);

    const generateRandomNumber = () => {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 90) + 1;
        } while (calledNumbers.includes(randomNumber));

        setCalledNumbers([...calledNumbers, randomNumber]);
        setCurrentNumber(randomNumber);
    };

    const handleNumberPress = (num) => {
        if (calledNumbers.includes(num)) {
            setTouchedNumbers(new Set(touchedNumbers.add(num)));
        } else {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Number Not Arrived',
                text2: 'This number has not been called yet.',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
    };

    const renderNumber = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.numberText,
                touchedNumbers.has(item) ? styles.touchedNumberText : null,
                item === currentNumber ? styles.currentNumberText : null,
            ]}
            onPress={() => handleNumberPress(item)}
        >
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Tambola</Text>
                <Feather name="menu" size={24} color="#FFFFFF" />
            </View>

            <View style={styles.container}>
                {/* Top Player Section */}
                <View style={styles.playerSection}>
                    <ScrollView>
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
                    </ScrollView>
                </View>

                {/* Numbers and Coupon Grid Section */}
                <View style={styles.numbersCouponContainer}>
                    {/* Number Container */}
                    <View style={styles.numContainer}>
                        <FlatList
                            data={calledNumbers}
                            renderItem={renderNumber}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.numberRow}
                        />
                        <View style={styles.currentNumberContainer}>
                            <Text style={styles.currentNumberDisplay}>{currentNumber}</Text>
                        </View>
                    </View>

                    {/* Coupon Grid */}
                    <View style={styles.couponContainer}>
                        {couponData.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.gridRow}>
                                {row.map((num, colIndex) => (
                                    <TouchableOpacity
                                        key={colIndex}
                                        style={[
                                            styles.gridCell,
                                            num === 0 ? styles.emptyCell : touchedNumbers.has(num) ? styles.touchedCell : styles.filledCell,
                                        ]}
                                        onPress={() => num !== 0 && handleNumberPress(num)}
                                    >
                                        <Text style={styles.cellText}>{num !== 0 ? num : ''}</Text>
                                    </TouchableOpacity>
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
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
};

export default Tambola;

const styles = StyleSheet.create({
    // Your styles here
    safeArea: {
        flex: 1,
        backgroundColor: '#212121',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFD700',
    },
    topBarText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
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
        flexDirection: 'row',
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
    touchedNumberText: {
        color: '#FF4500', // Red color for touched numbers
    },
    currentNumberContainer: {
        width: 60,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FF4500',
        borderRadius: 10,
        marginStart: 20,
    },
    currentNumberDisplay: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
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
        borderColor: '#4B0082',
        borderRadius: 4,
        margin: 2,
    },
    emptyCell: {
        backgroundColor: '#212121',
    },
    filledCell: {
        backgroundColor: '#FFD700',
    },
    touchedCell: {
        backgroundColor: '#FF4500',
    },
    cellText: {
        fontSize: 16,
        color: '#212121',
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    gameButton: {
        backgroundColor: '#4B0082',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFD700',
        fontSize: 16,
    },
});
