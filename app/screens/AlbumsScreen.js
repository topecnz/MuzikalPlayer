import React, { Component, useContext, useState } from 'react';
import { Modal, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

const AlbumsScreen = ({navigation}) => {
    const context = useContext(AudioContext);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
                
            </Modal>
            <ScrollView style={styles.containerInner}>
                {context.albums.sort((a, b) => a.album.localeCompare(b.album)).map(item => 
                    <Pressable style={styles.track} onPress={() => navigation.navigate("View Album", {album: item})}>
                        <Image source={{uri: item.images[0]}} style={styles.imageSize} />
                        <View style={styles.containerLeft}>
                            <View style={styles.trackDetails}>
                                <Text style={styles.trackTitle}>{item.album}</Text>
                            </View>
                        </View>
                        <View style={styles.containerRight}>
                            <Entypo name="dots-three-vertical" size={24} color="black" />
                        </View>
                    </Pressable>
                )}
            </ScrollView>
        </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   justifyContent: 'center',
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

export default AlbumsScreen;
