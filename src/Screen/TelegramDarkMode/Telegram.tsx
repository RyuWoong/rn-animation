import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {useColorScheme} from '../../Components/ColorSchemeContext';

export const Telegram = () => {
  const {colorScheme} = useColorScheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === 'light' ? 'white' : 'black',
      }}>
      <ScrollView>
        <Text>main</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
