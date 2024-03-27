import React from 'react';
import {View} from 'react-native';
import GradientClock from './src/GradientClock';
import JoyPainting from './src/JoyPainting';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <JoyPainting />
    </View>
  );
};

export default App;
