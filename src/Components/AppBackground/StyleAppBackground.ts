import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topNotch: {
    height: Platform.OS === 'ios' ? 55 : 0,
  },
  bottom: {
    height: Platform.OS === 'ios' ? 30 : 0,
  },
});

export default styles;