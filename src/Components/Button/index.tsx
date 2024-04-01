import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

interface Props extends PressableProps {
  children: string;
}
function Button({children, ...rest}: Props) {
  /* data */

  return (
    <Pressable style={styles.Container} {...rest}>
      <Text style={{color: '#333333', textAlign: 'center'}}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white',
  },
});

export default Button;
