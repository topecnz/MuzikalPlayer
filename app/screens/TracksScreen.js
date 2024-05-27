import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

class TracksScreen extends Component {
  static contextType = AudioContext;
  render() {
    return (
      <ScrollView style={styles.container}>
            {this.context.tracks.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title)).map(item => 
                <TouchableOpacity style={styles.track}>
                    <Image source={{uri: item.metadata.image}} style={styles.imageSize} />
                    <View style={styles.containerLeft}>
                        <View style={styles.trackDetails}>
                            <Text style={styles.trackTitle}>{ item.metadata.title }</Text>
                            <Text>{ item.metadata.artist }</Text>
                        </View>
                    </View>
                    <View style={styles.containerRight}>
                        <Entypo name="dots-three-vertical" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 20
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

export default TracksScreen;
