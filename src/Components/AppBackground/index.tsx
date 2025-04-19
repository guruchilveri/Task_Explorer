import React from 'react';
import { View } from 'react-native';
import AppStyles from '../../utils/AppStyles';
import { ColorTheme } from '../../assets';
import styles from './StyleAppBackground';
import { Loader, Toast } from '../index';

interface AppBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const AppBackground: React.FC<AppBackgroundProps> = ({
  children,
  backgroundColor = ColorTheme.ThemeColor,
}) => {
  return (
    <View style={[AppStyles.container, { backgroundColor }]}>
      <View style={styles.topNotch} />
      <View style={AppStyles.container}>{children}</View>
      <View style={styles.bottom} />
      <Loader isVisible={false} />
    </View>
  );
};

export default AppBackground;
