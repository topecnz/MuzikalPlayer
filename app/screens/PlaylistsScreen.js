import React, { Component, useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, Image, ScrollView, Pressable, TextInput, Dimensions } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

// create a component
const PlaylistsScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState({visible: false, id: null});
    const context = useContext(AudioContext);
    const [text, onChangeText] = React.useState('');

    onCreate = async (data) => {
        setModalVisible(!modalVisible)
        console.log(data)
        await context.newPlaylist(data)
        Alert.alert('Playlist created!');
        onChangeText("")
    }

    onUpdate = async (data) => {
      setModalVisible2({visible: false, id: null})
      console.log(data)
      await context.updatePlaylist(data)
      onChangeText("")
      Alert.alert('Playlist updated!');
    }

    onDelete = async (data) => {
      setModalVisible2({visible: false, id: null})
      console.log(data)
      await context.deletePlaylist(data)
      onChangeText("")
      Alert.alert('Playlist deleted!');
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text>Create New Playlist</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="New Playlist"
                />
                    <View style={styles.buttons}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={async () => await onCreate(text)}>
                        <Text style={styles.textStyle}>Create</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
            {/* Update modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible2.visible}
                onRequestClose={() => {
                setModalVisible2({visible: false, id: null});
                }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text>Update Playlist</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder=""
                />
                    <View style={styles.buttons}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={async () => await onUpdate({id: modalVisible2.id, name: text})}>
                        <Text style={styles.textStyle}>Update</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={async () => await onDelete(modalVisible2.id)}>
                        <Text style={styles.textStyle}>Delete</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() =>{onChangeText(""), setModalVisible2({visible: false, id: null})}}>
                        <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
            <ScrollView >
            <View>
            <Text style={styles.createText} onPress={() => setModalVisible(true)}>CREATE NEW PLAYLIST</Text>
            </View>
            {context.playlists.map(item => 
                <Pressable style={styles.track} key={item.id} onPress={() => navigation.navigate("View Playlist", {playlist: item})}>
                    <View style={styles.containerLeft}>
                        {/* <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} /> */}
                        <Text style={styles.genreTitle}>{item.name}</Text>
                        <Text>{item.tracks.length} tracks</Text>
                    </View>
                    <View style={styles.containerRight}>
                        <Entypo name="dots-three-vertical" size={24} color="black" onPress={() => {setModalVisible2({visible: true, id: item.id}), onChangeText(item.name)}} />
                    </View>
                </Pressable>
            )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    //   justifyContent: 'center',
    },
    track: {
        flexDirection: "row",
        paddingBottom: 5
    },
    genreTitle: {
        fontWeight: "bold",
        textAlignVertical: "center"
    },
    imageSize: {width: 70, height: 70},
    createText: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 20
    },
    containerLeft: {
        flex: 1,
        paddingHorizontal: 15,
        marginVertical: 10
    },
    containerRight: {
        alignItems: "center",
        justifyContent: "center"
    },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.2)"
      },
      input: {
        width: Dimensions.get("screen").width - 150,
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
      },
      buttons: {
        flexDirection: "row",
        columnGap: 5,
      }
  });
//make this component available to the app
export default PlaylistsScreen;

