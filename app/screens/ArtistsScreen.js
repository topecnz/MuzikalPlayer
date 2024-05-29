import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

class ArtistsScreen extends Component {
  static contextType = AudioContext;
  render() {
    return (
        <ScrollView contentContainerStyle={{alignContent: "center", justifyContent: "center"}} style={styles.container}>
            <View style={styles.recentAddedImages}>
                {this.context.artists.sort((a, b) => a.name.localeCompare(b.name)).map(item => 
                    <Pressable onPress={() => this.props.navigation.navigate("View Artist", {artist: item})}>
                        <Image source={{uri: item.albums[item.albums.length - 1].image}} style={styles.imageSize} resizeMode='scale'/>
                        <View styles={styles.artistTextCard}>
                            <Text style={styles.artistTextCard}>{item.name}</Text>
                        </View>
                    </Pressable>
                )}
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignContent: "center"
    },
    imageSize: {width: 120, height: 120},
    recentAddedImages: {
        paddingHorizontal: 15,
        paddingVertical: 10,        
        columnGap: 7,
        rowGap: 7,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    artistTextCard: {
        width: 120, // Set width to match image size
        height: 50,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 12,
        color: "white",
        backgroundColor: "rgba(100,100,100, 1)",
    },
    artistText: {
        fontSize: 16,
        color: "white",
        flexWrap: "wrap"
    }
  });

export default ArtistsScreen;
