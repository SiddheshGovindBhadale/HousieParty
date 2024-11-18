import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import Config from 'react-native-config';
import io from 'socket.io-client';
import { showToast } from '../utils/Utils';

const socket = io(Config.API_URL); // Replace with your server URL

const CreateRoomModal = ({ visible, onClose, userId }) => {
    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Listen for the message event from the server
        socket.on('message', (msg) => {
            showToast(msg)
            setMessage(msg);
        });

        return () => {
            // Cleanup the socket listeners
            socket.off('message');
        };
    }, []);

    const handleCreateRoom = () => {
        if (roomName.trim()) {
            socket.emit('createRoom', { roomName, userId }); // Emit the createRoom event
            setRoomName('');
            setMessage(''); // Clear inputs on successful creation
            onClose(); // Close the modal
        } else {
            setMessage('Room name cannot be empty.');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.heading}>Create a Room</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter room name"
                        value={roomName}
                        onChangeText={setRoomName}
                    />
                    <Button title="Create Room" onPress={handleCreateRoom} />
                    {message ? <Text style={styles.message}>{message}</Text> : null}
                    <Button title="Close" onPress={onClose} color="red" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        color: 'green',
        textAlign: 'center',
    },
});

export default CreateRoomModal;
