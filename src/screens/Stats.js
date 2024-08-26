import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';



const winners = [
  { id: '1', name: 'Winner 1' },
  { id: '2', name: 'Winner 2' },
  { id: '3', name: 'Winner 3' },
  { id: '4', name: 'Winner 4' },
  { id: '5', name: 'Winner 5' },
  { id: '6', name: 'Winner 6' },
  { id: '7', name: 'Winner 7' },
  { id: '8', name: 'Winner 8' },
  { id: '9', name: 'Winner 9' },
  { id: '10', name: 'Winner 10' },
  // Add more winners as needed
];

const Stats = () => {

  const navigation=useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <AntDesign name='left' color={'#FFFFFF'} size={20}/>
      </TouchableOpacity>
      
        <Text style={styles.topBarText}>Winning Stats</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <TouchableOpacity>
            
            <Image style={styles.stateImg} source={require('../assets/icon/podium.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.winnersContainer}>
          <FlatList
            data={winners}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.winnerItem}>
                <Text style={styles.winnerText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Stats;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#212121',
  },
  topBar: {
    padding: 15,
    backgroundColor: '#f7ac01',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  topBarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    width:'60%'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stateImg: {
    height: 250,
    width: 250,
  },
  winnersContainer: {
    flex: 1,
    padding: 20,
  },
  winnerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f7ac01',
    backgroundColor: '#333',
    marginVertical: 5,
    borderRadius: 5,
  },
  winnerText: {
    fontSize: 18,
    color: '#f7ac01',
  },
});
