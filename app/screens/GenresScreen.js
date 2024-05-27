import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

class GenresScreen extends Component {
    static contextType = AudioContext;
  render() {
    data = [];

    for (let i = 0; i < 20; i++) {
        data.push(
            <TouchableOpacity style={styles.track}>
                <View style={styles.containerLeft}>
                    <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                    <Text style={styles.genreTitle}>Track Title</Text>
                </View>
                <View style={styles.containerRight}>
                    <Entypo name="dots-three-vertical" size={24} color="black" />
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <ScrollView style={styles.container}>
            {data}
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
