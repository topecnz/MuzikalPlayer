import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';

// create a component
class ViewArtistScreen extends Component {
    static contextType = AudioContext;
    render() {
        const { route } = this.props;
        data = [];

        return (
            <ScrollView style={styles.container}>
                <View>
                <Image source={{uri: route.params.artist.albums[route.params.artist.albums.length - 1].image}} style={styles.imageSize}/>
                <Text style={styles.artistTitle}>{route.params.artist.name}</Text>
                </View>
                <View>
                    <Text style={styles.textCenter}>Albums</Text>
                    <View style={styles.albumImages}>
                        <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                        <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                        <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                        <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                        <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize2} />
                    </View>
                </View>
                <View>
                    <Text style={styles.textCenter}>Tracks</Text>
                    <View>
                        {this.context.tracks.map(item => {
                            if(route.params.artist.tracks.includes(item.assets.id)) {
                                return (
                                <TouchableOpacity style={styles.track}>
                                    <Image source={{uri: item.metadata.image}} style={styles.imageSize2} />
                                    <View style={styles.containerLeft}>
                                        <View style={styles.trackDetails}>
                                            <Text style={styles.trackTitle}>{item.metadata.title}</Text>
                                            <Text>{route.params.artist.name}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.containerRight}>
                                        <Entypo name="dots-three-vertical" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                                )
                            }
                        }
                    )}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20
    //   justifyContent: 'center',
    },
    imageSize: {
        width: null, height: 400
    },
    imageSize2: {width: 70, height: 70},
    textCenter: {
        padding: 10,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    albumImages: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        columnGap: 8,
        flexWrap: "wrap"
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
    artistTitle: {
        textAlign: "center",
        fontSize: 32,
        top: -35,
        marginBottom: -35,
        color: "white",
        backgroundColor: "rgba(10,10,10, 0.8)",
        fontWeight: "bold",
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
export default ViewArtistScreen;
