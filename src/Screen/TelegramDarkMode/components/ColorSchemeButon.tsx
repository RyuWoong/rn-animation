import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {useColorScheme} from '../../../Components/ColorSchemeContext';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export const ColorSchemeButton = () => {
  const {toggle, colorScheme, active} = useColorScheme();
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(e => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });
  return (
    <GestureDetector gesture={pan}>
      <Feather
        name={colorScheme === 'light' ? 'moon' : 'sun'}
        color={colorScheme === 'light' ? 'black' : 'white'}
        size={32}
      />
    </GestureDetector>
  );
};
