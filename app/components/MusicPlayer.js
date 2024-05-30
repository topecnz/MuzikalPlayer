import React, {useContext, useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

import Slider from '@react-native-community/slider';

const MusicPlayer = (props) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const context = useContext(AudioContext);
    const { playbackPosition, playbackDuration, currentAudio, audioData, audioObject } = context;

    const calcSeeker = () => {
        console.log("testing")
        if (!playbackPosition && !playbackDuration) {
            return playbackPosition / playbackPosition
        }
        return 0;
    }

    //is loaded
    // if (currentAudio.isLoaded && currentAudio.isPlaying) {
    //     audioObject.setOnPlaybackStatusUpdate()
    // }

    // const convertTime = (data) => {
    //     let minutes = Math.floor(data / 60)
    //     let seconds = parseInt(data - (minutes * 60))

    //     minutes = minutes < 10 ? "0" + minutes : minutes;
    //     seconds = seconds < 10 ? "0" + seconds : seconds;

    //     return minutes + ":" + seconds
    // }
    
    return (
        <SafeAreaView>
            <View style={styles.audioText}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>Now Playing</Text>
            </View>
            <Image source={{uri: audioData.metadata.image}} style={{width: null, height: 500}} />
            <View style={styles.audioText}>
                <Text style={{fontSize: 24, fontWeight: "bold"}}>{audioData.metadata.title}</Text>
                <Text style={{fontSize: 16}}>{audioData.metadata.artist}</Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.controllerInner}>
                <Text>00:00</Text>
                <Slider
                style={styles.progressBar}
                minimumValue={0}
                maximumValue={100}
                value={calcSeeker()}
                minimumTrackTintColor="#0F0F0F"
                maximumTrackTintColor="#000000"
                />
                <Text>{context.duration}</Text>
                </View>
                <View style={styles.controllerInner}>
                    <Entypo name="controller-jump-to-start" size={35} color="black" />
                    {context.currentAudio.isPlaying && !context.currentAudio.didJustFinish ? <Entypo name="controller-paus" size={35} color="black" onPress={async () => await context.pauseAudio()}/> : <Entypo name="controller-play" size={35} color="black" onPress={async () => await context.resumeAudio()}/>}
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