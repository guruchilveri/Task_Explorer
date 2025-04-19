import { StyleSheet } from 'react-native';
import { ColorTheme } from '../../assets';

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorTheme.ThemeColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: ColorTheme.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    color: ColorTheme.White,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
  },
  disabled: {
    backgroundColor: ColorTheme.Grey,
    opacity: 0.7,
  }
});

export default styles;