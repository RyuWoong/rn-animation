import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Telegram as Main} from './Telegram';
import {
  ColorSchemeProvider,
  useColorScheme,
} from '../../Components/ColorSchemeContext';
import {ColorSchemeButton} from './components/ColorSchemeButon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LeftDrawer = createDrawerNavigator();

function DrawerContent() {
  const {colorScheme} = useColorScheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.Container,
        {
          backgroundColor: colorScheme === 'light' ? 'white' : '#333',
          paddingTop: insets.top,
        },
      ]}>
      <View style={styles.Wrap}>
        <Text style={{flex: 1}}>Hello, User</Text>
        <ColorSchemeButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {flex: 1},
  Wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

function TelegramDarkMode() {
  return (
    <ColorSchemeProvider>
      <LeftDrawer.Navigator
        screenOptions={{drawerPosition: 'left'}}
        drawerContent={DrawerContent}>
        <LeftDrawer.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
      </LeftDrawer.Navigator>
    </ColorSchemeProvider>
  );
}

export default TelegramDarkMode;
