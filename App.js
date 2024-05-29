import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './app/navigations/StackNav';
import { registerRootComponent } from 'expo';
import AudioProvider from './app/provider/AudioProvider';
import FooterPlayer from './app/components/FooterPlayer';

export default function App() {
  return (
      <AudioProvider>
        <NavigationContainer>
            <StackNav />
        </NavigationContainer>
        <FooterPlayer/>
      </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

registerRootComponent(App);