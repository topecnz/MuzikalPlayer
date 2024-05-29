import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { Entypo } from "@expo/vector-icons";

// create a component
class MostPlayedScreen extends Component {
    render() {
        data = [];

        for (let i = 0; i < 20; i++) {
            data.push(
                <Pressable style={styles.track}>
                    <View style={styles.containerLeft}>
                        <Text style={styles.trackNumber}>{i + 1}</Text>
                        <Image source={{uri: 'https://a.ppy.sh/2103927'}} style={styles.imageSize} />
                        <View style={styles.trackDetails}>
                            <Text style={styles.trackTitle}>Track Title</Text>
                            <Text>Artist Name</Text>
                        </View>
                    </View>
                    <View style={styles.containerRight}>
                        <Entypo name="dots-three-vertical" size={24} color="black" />
                    </View>
                </Pressable>
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
    trackNumber: {
        textAlignVertical: "center",
        paddingRight: 15
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


//make this component available to the app
export default MostPlayedScreen;
