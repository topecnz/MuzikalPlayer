import React, { Component, useContext } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNav from './DrawerNav';
import ViewArtistScreen from '../screens/ViewArtistScreen';
import ViewAlbumScreen from '../screens/ViewAlbumScreen';
import ViewGenreScreen from '../screens/ViewGenreScreen';
import FooterPlayer from '../components/FooterPlayer';
import ViewPlaylistScreen from '../screens/ViewPlaylistScreen';
import MusicPlayer from '../components/MusicPlayer';
import { AudioContext } from '../provider/AudioProvider';

const Stack = createNativeStackNavigator();

const StackNav = () => {
    const context = useContext(AudioContext);
    if (context.isLoaded) {
        return (
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={DrawerNav} />
                <Stack.Screen name="View Artist" component={ViewArtistScreen}/>
                <Stack.Screen name="View Album" component={ViewAlbumScreen}/>
                <Stack.Screen name="View Genre" component={ViewGenreScreen}/>
                <Stack.Screen name="View Playlist" component={ViewPlaylistScreen}/>
                <Stack.Screen name="Music Player" component={MusicPlayer}/>
                {/* <Stack.Screen name="Audio List" component={AudioList}/> */}
            </Stack.Navigator>
        );
    }

}

export default StackNav;
