import { StyleSheet } from 'react-native';
import { ColorTheme } from '../../assets';

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0, // Initially hidden above the screen
    alignSelf: 'center',
    padding: 8,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    width: '90%',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  success: {
    backgroundColor: ColorTheme.Success,
  },
  error: {
    backgroundColor: ColorTheme.Red,
  },
});

export default styles;