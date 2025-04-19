import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styles from './StyleButton';

interface ButtonProps {
  text: string;
  onPress: () => void;
  buttonStyle?: object;
  textStyle?: object;
  disable?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  buttonStyle,
  textStyle,
  disable,
  variant = 'primary'
}) => {
  const fadeAnim = useRef(text.split('').map(() => new Animated.Value(0))).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 200,
        delay: index * 50,
        useNativeDriver: true,
      }).start();
    });
  }, [text]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        disable && styles.disabled,
        { transform: [{ scale: scaleAnim }] },
        buttonStyle
      ]}
    >
      {text.split('').map((char, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.text,
            textStyle,
            { opacity: fadeAnim[index] }
          ]}
        >
          {char}
        </Animated.Text>
      ))}
    </TouchableOpacity>
  );
};

export default Button;
