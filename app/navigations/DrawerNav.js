import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNav from './TabNav';
import FooterPlayer from '../components/FooterPlayer';
import MostPlayedScreen from '../screens/MostPlayedScreen';
import RecentlyPlayedScreen from '../screens/RecentlyPlayedScreen';
import PlayNowScreen from '../screens/PlayNowScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {

    return (
        <Drawer.Navigator initialRouteName="Library">
            <Drawer.Screen name="Play Now" component={PlayNowScreen}/>
            <Drawer.Screen name="Playlist" component={PlaylistsScreen}/>
            <Drawer.Screen name="Library" component={TabNav}/>
            <Drawer.Screen name="Most Played" component={MostPlayedScreen}/>
            <Drawer.Screen name="Recently Played" component={RecentlyPlayedScreen}/>
            {/* <Drawer.Screen name="Statistics" component={StatisticsScreen}/> */}
            {/* <Drawer.Screen name="Extra" component={ViewArtistScreen}/> */}
        </Drawer.Navigator>
    );
}

export default DrawerNav;
