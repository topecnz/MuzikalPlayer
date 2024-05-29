import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import Slider from '@react-native-community/slider';

function MusicPlayer(props) {
    return (
        <SafeAreaView>
            <View style={styles.audioText}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>Now Playing</Text>
            </View>
            <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={{width: null, height: 500}} />
            <View style={styles.audioText}>
                <Text style={{fontSize: 24, fontWeight: "bold"}}>Track Title</Text>
                <Text style={{fontSize: 16}}>Artist Name</Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.controllerInner}>
                <Text>00:00</Text>
                <Slider
                style={styles.progressBar}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#0F0F0F"
                maximumTrackTintColor="#000000"
                />
                <Text>00:00</Text>
                </View>
                <View style={styles.controllerInner}>
                    <Entypo name="controller-jump-to-start" size={35} color="black" />
                    <Entypo name="controller-play" size={35} color="black" />
                    <Entypo name="controller-next" size={35} color="black" />
                </View>
                <View style={styles.controllerInner}>
                    <MaterialCommunityIcons name="shuffle" size={35} color="black" />
                    <MaterialCommunityIcons name="repeat-off" size={35} color="black" />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    audioText: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20
    },
    controller: {
        paddingVertical: 20,
        paddingHorizontal: 40
    },
    controllerInner: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
    },
    progressBar: {
        width: "75%",
        height: 20,
        flexDirection: "row",
    }
})

export default MusicPlayer;