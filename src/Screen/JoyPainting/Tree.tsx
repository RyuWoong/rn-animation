import {Group, Path, SkRect, Skia, vec} from '@shopify/react-native-skia';
import {generateEllipsePoints, smoothPoints} from './Tools';
import {createNoise2D} from 'simplex-noise';
import {Palette} from './Pallete';

interface TreeProps {
  rct: SkRect;
}

function Tree({rct}: TreeProps) {
  const noise = createNoise2D();
  let points = generateEllipsePoints(rct);
  points = points.map((p, i) => {
    const A = 20;
    const F = 2;
    const d = A * noise((F * i) / (points.length - 1), 0);
    return vec(p.x + d, p.y + d);
  });
  points = smoothPoints(points);
  const path = points.reduce((acc, p, i) => {
    if (i === 0) {
      acc.moveTo(p.x, p.y);
    } else {
      acc.lineTo(p.x, p.y);
    }
    return acc;
  }, Skia.Path.Make());

  return (
    <Group clip={path}>
      <Path path={path} color={Palette.silentBoughs} />
      <Path
        path={path}
        color={Palette.grove}
        transform={[{translateX: -rct.width * 0.3}]}
      />
    </Group>
  );
}

export default Tree;
