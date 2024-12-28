/**
 * @format
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Router from './src/Router';
import { name as appName } from './app.json';

const Main = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Router />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => Main);
