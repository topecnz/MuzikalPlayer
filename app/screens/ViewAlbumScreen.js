import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component
class ViewAlbumScreen extends Component {
    static contextType = AudioContext;
    render() {
        const { route } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                    <Image source={{uri: route.params.album.images[0]}} style={styles.imageSize}/>
                    <Text style={styles.albumTitle}>{route.params.album.album}</Text>
                    </View>
                    <View style={styles.trackGap}>
                        {this.context.tracks.map(item => {
                            if(route.params.album.tracks.includes(item.assets.id)) {
                                return (
                                    <Pressable style={styles.track}>
                                        <View style={styles.containerLeft}>
                                            <Image source={{uri: item.metadata.image}} style={styles.imageSize2} />
                                            <View style={styles.option}>
                                                <View style={styles.trackDetails}>
                                                    <Text style={styles.trackTitle}>{item.metadata.title}</Text>
                                                    <Text>{item.metadata.artist}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.containerRight}>
                                            <Entypo name="dots-three-vertical" size={24} color="black" />
                                        </View>
                                    </Pressable>
                                )
                            }
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
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
    trackGap: {
        paddingTop: 15
    },
    containerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    albumTitle: {
        textAlign: "center",
        fontSize: 24,
        top: -35,
        marginBottom: -35,
        color: "white",
        backgroundColor: "rgba(10,10,10, 0.8)",
        fontWeight: "bold",
    },
    containerRight: {
        alignItems: "center",
        justifyContent: "center"
    }
});

//make this component available to the app
export default ViewAlbumScreen;
