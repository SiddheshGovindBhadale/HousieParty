import { StatusBar, Image, StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'

const Home = () => {

  const [gameList, setGameList] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function renderGameList() {
    return (
      <Modal
        visible={gameList}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setGameList(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.gameContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setGameList(false)}
            >
              <AntDesign name="close" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.selectedImageContainer}>
              {/* {selectedImage && (
                <Image style={styles.selectedImage} source={selectedImage} />
              )} */}
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.horizontalGameList}
              hidden={true}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(require('../assets/gameIcons/Tambola.png'));
                  setGameList(false);
                }}
                style={styles.gameItem}
              >
                <Image
                  style={styles.gameImage}
                  source={require('../assets/gameIcons/Tambola.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(require('../assets/gameIcons/TicTacToe.png'));
                  setGameList(false);
                }}
                style={styles.gameItem}
              >
                <Image
                  style={styles.gameImage}
                  source={require('../assets/gameIcons/TicTacToe.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(require('../assets/gameIcons/RockPaperScissor.png'));
                  setGameList(false);
                }}
                style={styles.gameItem}
              >
                <Image
                  style={styles.gameImage}
                  source={require('../assets/gameIcons/RockPaperScissor.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(require('../assets/gameIcons/RockPaperScissor.png'));
                  setGameList(false);
                }}
                style={styles.gameItem}
              >
                <Image
                  style={styles.gameImage}
                  source={require('../assets/gameIcons/RockPaperScissor.png')}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ImageBackground style={{ height: '100%'  }} source={require('../assets/gameIcons/Background.png')}>
          <StatusBar hidden={true} />
          <View style={styles.topBar}>
            {/* <TouchableOpacity style={styles.addContainer}>
            <View style={styles.iconButton}>
              <Image style={styles.img} source={require('../assets/icon/user.png')} />
            </View>
            <View style={styles.iconButton}>
              <Image style={styles.img} source={require('../assets/icon/user.png')} />
            </View>
            <View style={styles.iconButton}>
              <AntDesign name='plus' size={30} color={'#212121'} />
            </View>
          </TouchableOpacity> */}
            <View style={styles.left}>
              <TouchableOpacity style={styles.friendsContainer}>
                <View style={styles.onlineUserCount}>
                  <FontAwesome5 style={{ transform: [{ scaleX: -1 }], }} name='user-friends' size={13} color={'#f7ac01'} />
                  <Text style={styles.onlineUserCountText}>38</Text>
                </View>
                <View style={styles.bottomImages}>
                  <View style={styles.friendImageContainer}>
                    <Image style={styles.frientImage} source={require('../assets/icon/user.png')} />
                  </View>
                  <View style={styles.friendImageContainer}>
                    <Image style={styles.frientImage} source={require('../assets/icon/user.png')} />
                  </View>
                  <View style={styles.friendImageContainer}>
                    <Image style={styles.frientImage} source={require('../assets/icon/user.png')} />
                  </View>
                  <View style={styles.friendImageContainer}>
                    <AntDesign name='plus' size={22} color={'#FFFFFF'} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
              <View style={styles.userContainer}>
                <Text style={styles.username}>Username</Text>
                <Text style={styles.level}>Level: 84</Text>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <Image style={styles.profileImg} source={require('../assets/icon/user.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            {/* Add additional components like buttons, banners, etc. */}
          </View>
          <TouchableOpacity style={styles.GameBtn} onPress={() => setGameList(true)}>
            {selectedImage && (
              <Image style={styles.gameImg} source={selectedImage} />
            )}
          </TouchableOpacity>
          {renderGameList()}
          <View style={styles.BottomBar}>
            <TouchableOpacity style={styles.startButton} >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
            <View style={styles.settingBar} >
              <TouchableOpacity style={styles.BottomButtons}>
                <Text style={styles.username}>Rewards</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BottomButtons}>
                <Text style={styles.username}>WorkShop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BottomButtons}>
                <Text style={styles.username}>Mission</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BottomButtons}>
                <AntDesign name='doubleleft' style={{ transform: [{ rotate: '90deg' }] }} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#212121'
  },
  mainContainer: {
    // flex: 1,
    height: '100%',
    justifyContent: 'space-between', // Ensure content is spaced to allow the button at the bottom
  },
  topBar: {
    backgroundColor: '#FFFFFF10',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B1B1B153',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 5,
    backgroundColor: '#B7B7B7',
  },
  img: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
  },
  profileButton: {
    alignItems: 'center',
  },
  username: {
    color: "#ffffff",
    paddingRight: 10,
    fontSize: 13,
    fontWeight: 'bold',
  },
  level: {
     color: "#ffffff",
    fontSize: 10,
    paddingLeft: 15,
  },
  profileImg: {
    height: 30,
    width: 30,
    resizeMode: 'cover',
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startButton: {
    backgroundColor: '#f7ac01',
    borderRadius: 8,
    marginBottom: 5,
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignSelf: 'flex-start',
    marginStart: 10
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  gameContainer: {

    borderRadius: 10,
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  selectedImageContainer: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedImage: {
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
    resizeMode: 'cover',
  },
  GamesModal: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF48'
  },
  GameBtn: {
    borderRadius: 8,
    marginStart: 10,
    width: 141,
    height: 65,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    marginBottom: 5,
  },
  gameImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  horizontalGameList: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  gameImage: {
    height: 220,
    width: 220,
    resizeMode: 'cover',
    marginHorizontal: 5,
  },
  gameItem: {
    marginHorizontal: 5,
  },
  BottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Arrow: {
    marginEnd: 20

  },
  BottomButtons: {
    backgroundColor: '#514F4F46',
    borderRadius: 0,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    marginStart: 5

  },
  left: {
    overflow: 'hidden',
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  onlineUserCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-Start'
  },
  onlineUserCountText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
    marginLeft: 1
  },
  bottomImages: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 3
  },
  friendImageContainer: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#eeeeee'
  },
  frientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
})
