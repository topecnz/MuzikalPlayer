import React, {Component, useContext, useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Pressable, Modal } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import MusicPlayer from './MusicPlayer';
import { AudioContext } from '../provider/AudioProvider';

// create a component
const FooterPlayer = (props) => {
    const context = useContext(AudioContext);
    const [modalVisible, setModalVisible] = useState(false);
    if (context.isLoaded) {    
        return (
            <View>
                <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                    <MusicPlayer/>
                </Modal>
                <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
                    <View>
                        <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                    </View>
                    <View style={styles.containerMiddle}>
                        <Text style={styles.trackText}>Track Name</Text>
                        <Text style={styles.trackText2}>Artist Name</Text>
                        <Text style={styles.trackText2}>00:00 / 00:00</Text>
                    </View>
                    <View style={styles.containerRight}>
                        <Entypo name="controller-play" size={24} color="white" />
                    </View>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        backgroundColor: "rgb(40,40,40)",
        height: 70,
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
    },
    imageSize: {width: 50, height: 50},
    containerMiddle: {
        flex: 1,
        justifyContent: "center",
    },
    trackText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    trackText2: {
        color: "white",
        textAlign: "center"
    },
    containerRight: {
        padding: 10
    }
});

//make this component available to the app
export default FooterPlayer;
