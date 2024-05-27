import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

class PlayNowScreen extends Component {
  static contextType = AudioContext;
  render() {
    return (
        <View style={styles.container}>
        <View>
            <Text style={styles.title}>Recently Added</Text>
            <View style={styles.recentAddedImages}>
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
            </View>
        </View>
        <View>
            <Text style={styles.title}>Most Played</Text>
            <View style={styles.playedImages}>
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
            </View>
        </View>
        <View>
            <Text style={styles.title}>Recently Played</Text>
            <View style={styles.playedImages}>
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
            </View>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center",
      padding: 10
    },
    imageSize: {width: 100, height: 100},
    imageSize2: {width: 60, height: 60},
    recentAdded: {
        margin: 20
    },
    recentAddedImages: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        columnGap: 10,
        rowGap: 5,
        flexWrap: "wrap"
    },
    playedImages: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        columnGap: 8,
        flexWrap: "wrap"
    }
  }); 

export default PlayNowScreen;
