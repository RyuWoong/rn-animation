import {
  Circle,
  CornerPathEffect,
  DiscretePathEffect,
  DisplacementMap,
  Group,
  Oval,
  Rect,
  Skia,
  Turbulence,
  center,
  rect,
  vec,
} from '@shopify/react-native-skia';
import React, {ReactNode} from 'react';
import {useWindowDimensions} from 'react-native';

interface LimmatProps {
  children: ReactNode;
}
function Limmat({children}: LimmatProps) {
  const {height, width} = useWindowDimensions();

  const hongg = rect(0, height * 0.5, 1000, 500);
  const limmat = rect(-500, height * 0.6, 1000, 500);
  const undulations = rect(100, height * 0.5, 150, 600);
  const sun = vec(width / 2, height - 300);
  const clip = Skia.Path.Make();
  clip.addOval(limmat);

  return (
    <Group>
      <Oval rect={hongg} color={'darkgreen'} />
      {children}
      <Oval rect={limmat} color={'green'} />
      <Group clip={clip}>
        <Rect
          rect={undulations}
          color={'sienna'}
          origin={center(undulations)}
          transform={[{rotate: -Math.PI / 6}]}>
          <CornerPathEffect r={60} />
          <DiscretePathEffect length={40} deviation={50} />
        </Rect>
        <Circle c={sun} r={125} color={'orange'} opacity={0.5}>
          <DisplacementMap channelX="r" channelY="g" scale={50}>
            <Turbulence freqX={0.005} freqY={0.09} octaves={2} />
          </DisplacementMap>
        </Circle>
      </Group>
    </Group>
  );
}

export default Limmat;
