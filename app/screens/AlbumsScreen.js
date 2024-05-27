import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

class AlbumsScreen extends Component {
  static contextType = AudioContext;
  render() {
    return (
        <ScrollView style={styles.container}>
            {this.context.albums.sort((a, b) => a.album.localeCompare(b.album)).map(item => 
                <TouchableOpacity style={styles.track} onPress={() => navigation.navigate("View Album")}>
                    <Image source={{uri: item.images[0]}} style={styles.imageSize} />
                    <View style={styles.containerLeft}>
                        <View style={styles.trackDetails}>
                            <Text style={styles.trackTitle}>{item.album}</Text>
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
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    //   justifyContent: 'center',
    },
    track: {
        flexDirection: "row",
        paddingBottom: 5
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
