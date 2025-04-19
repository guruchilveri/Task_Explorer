import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import React from 'react';
import styles from './StyleTextComponent';
import { TextComponentTypes } from './textComponentTypes';

type TextComponentProps = TextProps & {
  type?: TextComponentTypes;
};

const TextComponent: React.FC<TextComponentProps> = (props) => {
  let textStyle: StyleProp<TextStyle>;
  switch (props?.type) {
    case 'I_18_500':
      textStyle = styles.I_18_500;
      break;
    default:
      textStyle = styles.I_18_500;
      break;
  }
  return (
    <Text {...props} style={[textStyle, props.style]} onPress={props.onPress}>
      {props?.children}
    </Text>
  );
};

export default TextComponent;


