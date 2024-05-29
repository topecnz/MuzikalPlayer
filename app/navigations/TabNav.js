import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PlayNowScreen from '../screens/PlayNowScreen';
import TracksScreen from '../screens/TracksScreen';
import ArtistsScreen from '../screens/ArtistsScreen';
import AlbumsScreen from '../screens/AlbumsScreen';
import GenresScreen from '../screens/GenresScreen';

const Tab = createMaterialTopTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator initialRouteName="Play Now">
            <Tab.Screen name="Play Now" component={PlayNowScreen} />
            <Tab.Screen name="Tracks" component={TracksScreen} />
            <Tab.Screen name="Artists" component={ArtistsScreen} />
            <Tab.Screen name="Albums" component={AlbumsScreen} />
            <Tab.Screen name="Genres" component={GenresScreen} />
        </Tab.Navigator>
    );
}

export default TabNav;
