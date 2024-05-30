import React, { Component, useContext, useState } from 'react';
import { Modal, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Pressable, Dimensions, Alert } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

const TracksScreen = ({navigation}) => {
    const context = useContext(AudioContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSelect, setModalVisibleSelect] = useState(false);
    const [trackData, setTrackData] = useState({metadata: {artist: null, title: null}});

    addToPlaylist = async (data) => {
        await context.addTrackPlaylist({id: data, tracks: [trackData.assets.id]});
        setModalVisibleSelect(!modalVisibleSelect)
        Alert.alert("Track added to playlist!");
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={modalStyles.container}>
                    <View style={modalStyles.containerInner}>
                        <Text style={modalStyles.modalTitle}>{trackData.metadata.artist} - {trackData.metadata.title}</Text>
                        <View style={modalStyles.modalBody}>
                            <Text onPress={() => {setModalVisibleSelect(true), setModalVisible(!modalVisible)}}>Add to Playlist</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleSelect}
                onRequestClose={() => setModalVisibleSelect(!modalVisibleSelect)}>
                <View style={modalStyles.container}>
                    <View style={modalStyles.containerInner2}>
                        <Text style={modalStyles.modalTitle}>{trackData.metadata.artist} - {trackData.metadata.title}</Text>
                        <ScrollView style={modalStyles.modalBody}>
                            {context.playlists.map(item => 
                                <Text style={modalStyles.playlistText} onPress={() => addToPlaylist(item.id)}>{item.name}</Text>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <ScrollView style={styles.containerInner}>
                {context.tracks.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title)).map(item => 
                    <Pressable style={styles.track} key={item.assets.id} onPress={async () => {console.log(item.assets.uri), await context.playAudio({uri: item.assets.uri}, item)}}>
                        <Image source={{uri: item.metadata.image}} style={styles.imageSize} />
                        <View style={styles.containerLeft}>
                            <View style={styles.trackDetails}>
                                <Text style={styles.trackTitle}>{ item.metadata.title }</Text>
                                <Text>{ item.metadata.artist }</Text>
                            </View>
                        </View>
                        <View style={styles.containerRight}>
                            {/* <Entypo name="dots-three-vertical" size={24} color="black" onPress={() => showModal(item.metadata.artist, item.metadata.title)}/> */}
                            <Entypo name="dots-three-vertical" size={24} color="black" onPress={() => {setTrackData(item), setModalVisible(true)}}/>
                        </View>
                    </Pressable>
                )}
            </ScrollView>
        </View>
    );
  }


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    containerInner: {
        paddingHorizontal: 20
    },
    track: {
        flexDirection: "row",
        paddingVertical: 5
    },
    trackDetails: {
        padding: 5,
        paddingLeft: 15
    },
    trackTitle: {
        fontWeight: "bold",
    },
    imageSize: {width: 70, height: 70},
    details: {
        flexDirection: "row"
    },
    containerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    containerRight: {
        alignItems: "center",
        justifyContent: "center"
    },
  });

const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
    containerInner: {
        width: Dimensions.get("screen").width - 40,
        height: "15%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    containerInner2: {
        width: Dimensions.get("screen").width - 40,
        height: "40%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    modalBody: {
        paddingVertical: 20,
    },
    playlistText: {
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 3,
        fontWeight: "bold"
    }
});

export default TracksScreen;
