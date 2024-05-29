import React, {Component, useContext, useState} from 'react';
import { Alert, Modal, StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { AudioContext } from '../provider/AudioProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component
const ViewArtistScreen = ({navigation, route}) => {
    const context = useContext(AudioContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSelect, setModalVisibleSelect] = useState(false);
    const [trackData, setTrackData] = useState({metadata: {artist: null, title: null}});

    addToPlaylist = async (data) => {
        await context.addTrackPlaylist({id: data, tracks: [trackData.assets.id]});
        setModalVisibleSelect(!modalVisibleSelect)
        Alert.alert("Track added to playlist!");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={modalStyles.container}>
                    <View style={modalStyles.containerInner}>
                        <Text style={modalStyles.modalTitle}>{trackData.metadata.artist} - {trackData.metadata.title}</Text>
                        <View style={modalStyles.modalBody}>
                            <Text onPress={() => {setModalVisibleSelect(true), setModalVisible(!modalVisible)}}>Add to Playlist</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleSelect}
                onRequestClose={() => setModalVisibleSelect(!modalVisibleSelect)}>
                <View style={modalStyles.container}>
                    <View style={modalStyles.containerInner2}>
                        <Text style={modalStyles.modalTitle}>{trackData.metadata.artist} - {trackData.metadata.title}</Text>
                        <ScrollView style={modalStyles.modalBody}>
                            {context.playlists.map(item => 
                                <Text style={modalStyles.playlistText} onPress={() => addToPlaylist(item.id)}>{item.name}</Text>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <ScrollView >
                <View>
                <Image source={{uri: route.params.artist.albums[route.params.artist.albums.length - 1].image}} style={styles.imageSize}/>
                <Text style={styles.artistTitle}>{route.params.artist.name}</Text>
                </View>
                <View>
                    <Text style={styles.textCenter}>Tracks</Text>
                    <View>
                        {context.tracks.map(item => {
                            if(route.params.artist.tracks.includes(item.assets.id)) {
                                return (
                                <Pressable style={styles.track}>
                                    <Image source={{uri: item.metadata.image}} style={styles.imageSize2} />
                                    <View style={styles.containerLeft}>
                                        <View style={styles.trackDetails}>
                                            <Text style={styles.trackTitle}>{item.metadata.title}</Text>
                                            <Text>{route.params.artist.name}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.containerRight}>
                                        <Entypo name="dots-three-vertical" size={24} color="black" onPress={() => {setTrackData(item), setModalVisible(true)}}/>
                                    </View>
                                </Pressable>
                                )
                            }
                        }
                    )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
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

const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
    containerInner: {
        width: Dimensions.get("screen").width - 40,
        height: "15%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    containerInner2: {
        width: Dimensions.get("screen").width - 40,
        height: "40%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    modalBody: {
        paddingVertical: 20,
    },
    playlistText: {
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 3,
        fontWeight: "bold"
    }
});
//make this component available to the app
export default ViewArtistScreen;
