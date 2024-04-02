import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Button} from '../../Components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigation/types';
import {Canvas, Circle} from '@shopify/react-native-skia';

type navigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const List: {name: string; target: keyof RootStackParamList}[] = [
  {
    name: 'Gradient Clock',
    target: 'GradientClock',
  },
  {
    name: 'Joy Painting',
    target: 'JoyPainting',
  },
  {
    name: 'Telegram Dark Mode',
    target: 'TelegramDarkMode',
  },
  {
    name: 'Rings',
    target: 'Rings',
  },
];

interface Props {
  navigation: navigation;
}

function Home({navigation}: Props) {
  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView contentContainerStyle={{padding: 20, gap: 16}}>
        {List.map(item => (
          <Button
            key={item.name}
            onPress={() => navigation.navigate(item.target)}>
            {item.name}
          </Button>
        ))}
      </ScrollView>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
        <Circle c={{x: 100, y: 100}} r={30} />
      </Canvas>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {flex: 1, backgroundColor: '#fff'},
});

export default Home;
