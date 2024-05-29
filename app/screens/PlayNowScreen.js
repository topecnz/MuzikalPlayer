import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

class PlayNowScreen extends Component {
  static contextType = AudioContext;
  render() {
    // get first 6 latest albums
    let albums = []
    // console.log(this.context.albums)
    if (this.context.albums) {
        for (i = this.context.albums.length; i > this.context.albums.length - 6; i--) {
            let item = this.context.albums[i-1];
            // console.log(item)
            albums.push(
                <Pressable onPress={() => this.props.navigation.navigate("View Album", {album: item})}>
                    <Image source={{uri: item.images[0]}} style={styles.imageSize} />
                    <View style={styles.albumTextCard}>
                        <Text style={styles.albumText}>{item.album}</Text>
                    </View>
                </Pressable>
            )
        }
    }
    return (
        
        <View style={styles.container}>
        <View>
            <Text style={styles.title}>Recently Added</Text>
            <View style={styles.recentAddedImages}>
                {albums}
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
    imageSize: {width: 120, height: 120},
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
    },
    albumTextCard: {
        width: 120, // Set width to match image size
        height: 50,
        fontSize: 12,
        color: "white",
        backgroundColor: "rgba(100,100,100, 1)",
        justifyContent:"center"
    },
    albumText: {
        textAlign: "center",
        fontSize: 12,
        color: "white",
        flexWrap: "wrap",
    }
  }); 

export default PlayNowScreen;
