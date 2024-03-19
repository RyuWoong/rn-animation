import React, {useEffect} from 'react';
import {Canvas, Rect, SweepGradient, vec} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const {width, height} = Dimensions.get('window');

function Animation() {
  const rotation = useSharedValue(0);
  const centerX = width / 2;
  const centerY = height / 2;
  const centerVec = vec(centerX, centerY);

  const animatedRotation = useDerivedValue(() => {
    return [{rotate: Math.PI * rotation.value}];
  }, [rotation]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2, {duration: 4000, easing: Easing.linear}),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.Container}>
      <Canvas style={styles.Container}>
        <Rect x={0} y={0} width={width} height={height} color={'black'}>
          <SweepGradient
            origin={centerVec}
            c={centerVec}
            colors={['white', 'gray', '#222222', 'black']}
            start={0}
            end={360}
            transform={animatedRotation}
          />
        </Rect>
      </Canvas>
      <Text style={styles.Day}>DAY</Text>
      <Text style={styles.Night}>NIGHT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {flex: 1},
  Day: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    color: 'black',
    fontSize: 90,
    fontWeight: '100',
  },
  Night: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    color: 'white',
    fontSize: 90,
    fontWeight: '100',
  },
});

export default Animation;
