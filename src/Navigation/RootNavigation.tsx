import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './types';
import {GradientClock, Home, JoyPainting, TelegramDarkMode} from '../Screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  /* data */

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GradientClock" component={GradientClock} />
      <Stack.Screen name="JoyPainting" component={JoyPainting} />
      <Stack.Screen name="TelegramDarkMode" component={TelegramDarkMode} />
    </Stack.Navigator>
  );
}

export default RootNavigation;
