import {
  Canvas,
  Circle,
  Fill,
  Image,
  ImageShader,
  SkImage,
  dist,
  makeImageFromView,
  mix,
  vec,
} from '@shopify/react-native-skia';
import React, {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';
import {
  Appearance,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {wait} from '../../Utils';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

export type ColorSchemeName = 'light' | 'dark';

interface ColorScheme {
  colorScheme: ColorSchemeName;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
  active: boolean;
}

interface ColorSchemeContext extends ColorScheme {
  dispatch: (scheme: ColorScheme) => void;
  ref: RefObject<View>;
  transition: SharedValue<number>;
  circle: SharedValue<{x: number; y: number; r: number}>;
}

const defaultValue: ColorScheme = {
  colorScheme: Appearance.getColorScheme() ?? 'light',
  overlay1: null,
  overlay2: null,
  active: false,
};

const ColorSchemeContext = createContext<ColorSchemeContext | null>(null);

const colorSchemeReducer = (_: ColorScheme, colorScheme: ColorScheme) => {
  return colorScheme;
};

export const useColorScheme = () => {
  const ctx = useContext(ColorSchemeContext);
  if (ctx === null) {
    throw new Error('No ColorScheme context context found');
  }
  const {colorScheme, dispatch, circle, transition, active, ref} = ctx;

  const toggle = useCallback(
    async (x: number, y: number) => {
      const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
      dispatch({
        active: true,
        colorScheme,
        overlay1: null,
        overlay2: null,
      });

      const r = Math.max(...corners.map(corner => dist(corner, {x, y})));
      circle.value = {
        x,
        y,
        r,
      };

      const overlay1 = await makeImageFromView(ref);
      dispatch({
        active: true,
        colorScheme,
        overlay1,
        overlay2: null,
      });

      await wait(16);
      dispatch({
        active: true,
        colorScheme: newColorScheme,
        overlay1,
        overlay2: null,
      });

      await wait(16);
      const overlay2 = await makeImageFromView(ref);
      dispatch({
        active: true,
        colorScheme: newColorScheme,
        overlay1,
        overlay2,
      });

      const duration = 650;
      transition.value = 0;
      transition.value = withTiming(1, {duration});
      await wait(duration);
      dispatch({
        active: false,
        colorScheme: newColorScheme,
        overlay1: null,
        overlay2: null,
      });
    },
    [circle, colorScheme, dispatch, ref, transition],
  );
  return {colorScheme, toggle, active};
};

interface ColorSchemeProviderProps {
  children: ReactNode;
}

export const ColorSchemeProvider = ({children}: ColorSchemeProviderProps) => {
  const circle = useSharedValue({x: 0, y: 0, r: 0});

  const transition = useSharedValue(0);
  const ref = useRef(null);
  const [{colorScheme, overlay1, overlay2, active}, dispatch] = useReducer(
    colorSchemeReducer,
    defaultValue,
  );
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
      />
      <View style={{flex: 1}} ref={ref} collapsable={false}>
        <ColorSchemeContext.Provider
          value={{
            colorScheme,
            dispatch,
            ref,
            overlay1,
            overlay2,
            transition,
            circle,
            active,
          }}>
          {children}
        </ColorSchemeContext.Provider>
      </View>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image image={overlay1} x={0} y={0} width={width} height={height} />
        {overlay2 && (
          <Circle c={circle} r={r}>
            <ImageShader
              image={overlay2}
              x={0}
              y={0}
              width={width}
              height={height}
              fit="cover"
            />
          </Circle>
        )}
      </Canvas>
    </View>
  );
};
