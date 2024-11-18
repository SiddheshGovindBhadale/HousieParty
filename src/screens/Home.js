import { StatusBar, Image, StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView, ImageBackground, Dimensions, Animated, FlatList, AppState, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import { showToast } from '../utils/Utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { io } from "socket.io-client";
import Config from 'react-native-config'
import { NativeStackView } from '@react-navigation/native-stack'
import axios from 'axios'
import { FetchUsersByIds } from '../apis/FetchUsersByIds'
import { FetchUserData } from '../apis/FetchUserData'
import CreateRoomModal from '../components/CreateRoomModal'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get('window');

const Home = () => {
  let navigation = useNavigation()
  const socket = io(Config.API_URL);
  const userData = useSelector((state) => state.userData.userData)

  const [gameList, setGameList] = useState(false);
  const [toggleUserList, setToggleUserList] = useState(false);
  const [selectedImage, setSelectedImage] = useState(require('../assets/gameIcons/Tambola.png'));
  const [onlineUsers, setOnlineUsers] = useState({});
  const [onlineUsersLocal, setOnlineUsersLocal] = useState({});
  const [userId, setUserId] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [isCreateRoomModalVisible, setCreateRoomModalVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [roomName, setRoomName] = useState('MyRoom');


  console.log("onlineUsers", onlineUsers);

  useEffect(() => {
    if (userId && !Object.values(onlineUsers).includes(userId)) {
      socket.emit('add-user', userId);
    }

    const updateUserListHandler = (users) => {
      setOnlineUsers(users);
      setOnlineUsersLocal(users);
    };

    // Listen for users going offline
    const goingOfflineHandler = async (offlineUserId) => {
      const fetchdata = await FetchUserData(offlineUserId)
      if (fetchdata[0].name !== undefined) {
        showToast(`Oops! ${fetchdata[0].name} has just gone offline.`)
      }
    };

    socket.on('updateUserList', updateUserListHandler);
    socket.on('goingOffline', goingOfflineHandler);

    socket.on("message", (data) => {
      console.log("Message received from server:", data);
    });

    // Listen for invitations
    socket.on('roomInvite', ({ roomName, inviterId, timeout }) => {
      setNotification({ roomName, inviterId, timeout });

      // Automatically clear notification after timeout
      setTimeout(() => setNotification(null), timeout * 1000);
    });

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        socket.emit('remove-user', userId);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      socket.off('updateUserList');
      socket.off('message');
      socket.off('roomInvite');
      subscription.remove();
    };
  }, [userId]);

  // logout 
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
    showToast('Logout Succesfull')
  };

  // animation for sliding effects 
  const slideAnim = useRef(new Animated.Value(-250)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: toggleUserList ? 0 : -250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [toggleUserList])


  // load online user data from database 
  useEffect(() => {
    const loadUserData = async () => {
      const idsArray = Object.keys(onlineUsers);
      try {
        const usersData = await FetchUsersByIds(idsArray);
        setUserDetails(usersData);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };
    loadUserData()
  }, [onlineUsers]);


  const createRoom = () => {
    socket.emit('createRoom', "TextRoom");
  }

  const joinRoom = () => {
    socket.emit('joinRoom', "TextRoom");
  }


  const renderGameList = () => {
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

  const handleSendInvite = (inviteeId) => {
    console.log("dfsgfs", inviteeId, roomName);

    socket.emit('sendInvite', { roomName, inviteeId });
  };

  const renderItem = ({ item }) => (
    userId !== item._id && (
      <View style={styles.userCard}>
        <View style={styles.userCardProfile}>
          <Image style={styles.userCardProfileImage} source={require('../assets/icon/user.png')} />
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userCarduserName}>{item.name}</Text>
          <Text style={styles.userCardOnlineStatus}>online</Text>
        </View>
        <TouchableOpacity style={styles.inviteButton} onPress={() => { handleSendInvite(item._id) }}>
          <AntDesign name='plus' size={18} color={'#FFFFFF'} />
        </TouchableOpacity>
      </View>
    )
  );

  return (
    <SafeAreaView style={[styles.safeArea, { height: height }]}>
      <View style={styles.mainContainer}>
        <Animated.View style={[styles.userListContainer, { left: slideAnim }]}>
          <View style={styles.userList}>
            <FlatList
              data={userDetails}
              keyExtractor={(item, index) => index}
              renderItem={
                renderItem
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <TouchableOpacity
            style={styles.userListCloseButton}
            onPress={() => setToggleUserList(!toggleUserList)}
          >
            <AntDesign name='left' size={18} color={'#FFFFFF'} />
          </TouchableOpacity>
        </Animated.View>


        <ImageBackground style={{ height: height, padding: 10 }} source={require('../assets/gameIcons/background.jpg')}>
          <View style={styles.topBar}>
            <View style={styles.left}>
              <TouchableOpacity style={styles.friendsContainer} onPress={() => { setToggleUserList(!toggleUserList) }}>
                <View style={styles.onlineUserCount}>
                  <FontAwesome5 style={{ transform: [{ scaleX: -1 }], }} name='user-friends' size={13} color={'#f7ac01'} />
                  <Text style={styles.onlineUserCountText}>{userDetails.length === 0 ? 0 : userDetails.length - 1}</Text>
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
                    <AntDesign name='plus' size={18} color={'#FFFFFF'} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.profileContainer}>
              <View style={styles.userContainer}>
                <Text style={styles.username}>{userData ? userData.name : 'Guest'}</Text>
                <Text style={styles.level}>Level: 0</Text>
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
              <TouchableOpacity style={styles.BottomButtons} onPress={() => { setCreateRoomModalVisible(true) }}>
                <Text style={styles.BottomButtonsText}>Create Room</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BottomButtons} onPress={() => { joinRoom() }}>
                <Text style={styles.BottomButtonsText}>Join Room</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BottomButtons}>
                <Text style={styles.BottomButtonsText}>Mission</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BottomButtons} onPress={() => { handleLogout() }}>
                <MaterialIcons name='logout' size={16} color='#ffffff' />
              </TouchableOpacity>
            </View>
          </View>

          <CreateRoomModal
            visible={isCreateRoomModalVisible}
            onClose={() => setCreateRoomModalVisible(false)}
            userId={userId}
          />

          {notification && (
            <Modal transparent>
              <View style={styles.modal}>
                <Text>
                  {`You are invited to join ${notification.roomName} by ${notification.inviterId}`}
                </Text>
                <Button
                  title="Accept"
                  onPress={() => {
                    socket.emit('respondToInvite', {
                      roomName: notification.roomName,
                      accept: true,
                      userId: userId, // Replace with actual userId
                    });
                    setNotification(null)
                  }
                  }
                />
                <Button
                  title="Reject"
                  onPress={() => {
                    socket.emit('respondToInvite', {
                      roomName: notification.roomName,
                      accept: false,
                      userId: userId, // Replace with actual userId
                    });
                    setNotification(null)
                  }
                  }
                />
              </View>
            </Modal>
          )}
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: '#212121',
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
    // paddingRight: 20,
    // paddingLeft: 20,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B1B1B153',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10
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
    marginLeft: 10
  },
  username: {
    color: "#ffffff",
    // paddingRight: 10,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right'
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
    // marginTop: 5,
  },

  // user list container 
  userListContainer: {
    position: 'absolute',
    height: '100%',
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250
  },
  userList: {
    height: '100%',
    width: 225,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    marginVertical: 3
  },
  userCardProfile: {
    width: 35,
    height: 35
  },
  userCardProfileImage: {
    width: '100%',
    height: '100%'
  },
  userDetails: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '60%'
  },
  userCardOnlineStatus: {
    fontSize: 10,
    color: '#FFFFFF'
  },
  userCarduserName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff'
  },
  inviteButton: {
    // borderWidth: 1,
    // borderColor: 'red',
    padding: 2
  },
  userListCloseButton: {
    paddingVertical: 20,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7
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
    // marginBottom: 5,
    paddingVertical: 9,
    paddingHorizontal: 50,
    alignSelf: 'flex-start',
    // marginStart: 10
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
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
    // marginStart: 10,
    width: 138,
    height: 50,
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
    // marginEnd: 20

  },
  BottomButtons: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 23,
    alignSelf: 'flex-end',
    marginStart: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  BottomButtonsText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  left: {
    overflow: 'hidden',
    paddingVertical: 5,
    paddingHorizontal: 4,
    // backgroundColor: 'rgba(128, 128, 128, 0.5)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',

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
    borderColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  frientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },


  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },

})
