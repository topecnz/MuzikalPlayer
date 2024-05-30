//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Controller = () => {

    convertTimeDuration = (data) => {
        let minutes = Math.floor(data / 60)
        let seconds = parseInt(data - (minutes * 60))

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.updateState(this, {duration: minutes + ":" + seconds})
        // this.setState({...this.state, duration: duration, position: position})
    }

    convertTimePosition = (data) => {
        let minutes = Math.floor(data / 60)
        let seconds = parseInt(data - (minutes * 60))

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.updateState(this, {position: minutes + ":" + seconds})
        // this.setState({...this.state, duration: duration, position: position})
    }

    setDuration = async (data) => {
        if (data.isLoaded && data.isPlaying) {
            await this.setState({
                playbackPosition: data.positionMillis,
                playbackDuration: data.durationMillis,
            });

            console.log(this.state.playbackPosition);
        }
    };

    playAudio = async (uri, option, data) => {
        if (this.state.currentAudio === null) {
            const audio = new Audio.Sound();
            const currentAudio = await audio.loadAsync(uri, op{ shouldPlay: option.shouldPlay, progressUpdateIntervalMillis: 1000})

            this.setState({...this.state, audioData: data, audioObject: audio, currentAudio: currentAudio})
            // console.log(currentAudio.durationMillis / 1000, data.assets.duration)
            // await this.convertTime(data.assets.duration)
        }

        // if (this.state.currentAudio && this.state.currentAudio.sound.uri === uri && JSON.stringify(data) === JSON.stringify(this.state.audioData)) {
        //     return;
        // }

        if (this.state.currentAudio && JSON.stringify(data) != JSON.stringify(this.state.audioData)) {
            await this.state.audioObject.stopAsync();
            await this.state.audioObject.unloadAsync();
            const currentAudio = await audio.loadAsync(uri, { shouldPlay: option.shouldPlay, progressUpdateIntervalMillis: 1000});
            const duration = await currentAudio.getStatusAsync().then((status) => status.durationMillis);

            this.setState({
                ...this.state,
                audioData: data,
                audioObject: audio,
                currentAudio: currentAudio,
                playbackDuration: duration,
            });

            // await this.convertTime(duration);
        }

        // this.state.audioObject.setProgressUpdateIntervalAsync(100);
        this.state.audioObject.setOnPlaybackStatusUpdate(this.setDuration)
    }

    pauseAudio = async () => {
        const currentAudio = await this.state.audioObject.pauseAsync();
        this.setState({...this.state, currentAudio: currentAudio})
    }

    resumeAudio = async () => {
        const currentAudio = await this.state.audioObject.playAsync();
        this.setState({...this.state, currentAudio: currentAudio})
    }

    stopAudio = async (uri, option, data) => {
        const audio = Audio.Sound();
        const currentAudio = await audio.loadAsync(uri, option)
    }

    nextAudio = async (uri, option, data) => {
        const audio = new Audio.Sound();
        const currentAudio = await audio.loadAsync(uri, option)

        currentAudio.
        this.setState({...this.state, audioData: data, audioObject: currentAudio})
        console.log(data)
    }

    previousAudio = async (uri, option, data) => {
        const audio = new Audio.Sound();
        const currentAudio = await audio.loadAsync(uri, option)

        currentAudio.
        this.setState({...this.state, audioData: data, audioObject: currentAudio})
        console.log(data)
    }

    return (
        <View style={styles.container}>
            <Text>Controller</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Controller;
