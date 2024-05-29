import React, { Component, useContext, useState } from 'react';
import { Modal, StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

const GenresScreen = ({navigation}) => {
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
                {context.genres.sort((a, b) => a.name.localeCompare(b.name)).map(item => 
                    <Pressable style={styles.track} onPress={() => this.props.navigation.navigate("View Genre", {genre: item})}>
                        <View style={styles.containerLeft}>
                            <Image source={{uri: item.images[item.images.length - 1]}} style={styles.imageSize} />
                            <Text style={styles.genreTitle}>{item.name}</Text>
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
        paddingHorizontal: 20,
    },
    track: {
        flexDirection: "row",
        paddingVertical: 5,
    },
    genreTitle: {
        fontWeight: "bold",
        paddingLeft: 15,
        textAlignVertical: "center"
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

export default GenresScreen;
