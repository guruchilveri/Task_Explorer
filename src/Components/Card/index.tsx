import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ColorTheme } from '../../assets';
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorTheme.White,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: ColorTheme.Red,
    shadowOffset: { width: 0, height: 4 }, // Shadow direction
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
});

const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;
