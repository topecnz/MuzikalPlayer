import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNav from './DrawerNav';
import ViewArtistScreen from '../screens/ViewArtistScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={DrawerNav} />
            <Stack.Screen name="View Artist" component={ViewArtistScreen}/>
            {/* <Stack.Screen name="View Album" component={ViewAlbumScreen}/>
            <Stack.Screen name="View Playlist" component={ViewPlaylistScreen}/>
            <Stack.Screen name="Music Player" component={MusicPlayer}/>
            <Stack.Screen name="Audio List" component={AudioList}/> */}
        </Stack.Navigator>
    );

}

export default StackNav;
