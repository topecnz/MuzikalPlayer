import React, { Component, useContext, useState } from 'react';
import { Modal, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

const TracksScreen = ({navigation}) => {
    const context = useContext(AudioContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [trackData, setTrackData] = useState({metadata: {artist: null, title: null}});

    showModal = (item) => {
        setTrackData(item)
        setModalVisible(true);
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
                                <Text>Add to Playlist</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            <ScrollView style={styles.containerInner}>
                    {context.tracks.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title)).map(item => 
                        <Pressable style={styles.track} key={item.assets.id}>
                            <Image source={{uri: item.metadata.image}} style={styles.imageSize} />
                            <View style={styles.containerLeft}>
                                <View style={styles.trackDetails}>
                                    <Text style={styles.trackTitle}>{ item.metadata.title }</Text>
                                    <Text>{ item.metadata.artist }</Text>
                                </View>
                            </View>
                            <View style={styles.containerRight}>
                                {/* <Entypo name="dots-three-vertical" size={24} color="black" onPress={() => showModal(item.metadata.artist, item.metadata.title)}/> */}
                                <Entypo name="dots-three-vertical" size={24} color="black" onPress={() =>  showModal(item)}/>
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
    }
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
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    modalBody: {
        paddingVertical: 20,
    }
})

export default TracksScreen;
