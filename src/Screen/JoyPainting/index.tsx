// https://youtu.be/GQqL1OCoOFM?si=rNjVrEc8SJCgr7eN

import {
  BlurMask,
  Canvas,
  Circle,
  CornerPathEffect,
  DiscretePathEffect,
  Fill,
  LinearGradient,
  Oval,
  SkRect,
  rect,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import Limmat from './Limmat';
import Silo from './Silo';
import Tree from './Tree';
import {Grain} from './Grain';

const sun = {r: 125, c: vec(350, 200)};

interface CloudProps {
  rct: SkRect;
}

const Cloud = ({rct}: CloudProps) => {
  const {width} = useWindowDimensions();

  return (
    <Oval rect={rct}>
      <LinearGradient
        start={vec(-width * 0.5, 0)}
        end={vec(width * 1.25, 0)}
        colors={['white', 'rgba(255,255,255,0)', 'white']}
      />
      <CornerPathEffect r={20} />
      <DiscretePathEffect length={50} deviation={20} />
    </Oval>
  );
};

const Sun = () => {
  return (
    <Circle r={sun.r} c={sun.c} color={'orange'}>
      <BlurMask blur={40} />
    </Circle>
  );
};

const Sky = () => {
  const {height} = useWindowDimensions();

  return (
    <>
      <Fill>
        <LinearGradient
          colors={['#B4D7EB', '#87DBF3']}
          start={vec(0, 0)}
          end={vec(0, height * 0.4)}
        />
      </Fill>
    </>
  );
};

function JoyPainting() {
  /* data */

  return (
    <View style={styles.Container}>
      <Canvas style={styles.Container}>
        <Grain>
          <Sky />
          <Sun />
          <Cloud rct={rect(-150, 50, 350, 50)} />
          <Cloud rct={rect(250, 150, 250, 70)} />
          <Cloud rct={rect(-100, 200, 250, 100)} />
          <Limmat>
            <Silo />
          </Limmat>
          <Tree rct={rect(125, 430, 120, 150)} />
          <Tree rct={rect(50, 420, 120, 150)} />
          <Tree rct={rect(-50, 410, 120, 170)} />
        </Grain>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {flex: 1},
});

export default JoyPainting;
