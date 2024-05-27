//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class RecentlyPlayedScreen extends Component {
    render() {
        data = [];

        for (let i = 0; i < 20; i++) {
            data.push(
                <TouchableOpacity style={styles.track} onPress={() => navigation.navigate("View Playlist")}>
                    <View style={styles.containerLeft}>
                        <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                        <Text style={styles.genreTitle}>Playlist Name {i+1}</Text>
                    </View>
                    <View style={styles.containerRight}>
                        <Entypo name="dots-three-vertical" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <ScrollView style={styles.container}>
            <View>
                <Text style={styles.createText}>CREATE NEW PLAYLIST</Text>
            </View>
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
    createText: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 20
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

//make this component available to the app
export default RecentlyPlayedScreen;
