import { StyleSheet, Platform } from 'react-native';
import { ColorTheme } from '../assets';
import { fontPixel, lineHeightPixel } from './Dimensions';

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCenterSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenterSpaceAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSpaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  whiteBg: {
    backgroundColor: ColorTheme.White,
  },
  themeBg: {
    backgroundColor: ColorTheme.ThemeColor,
  },
  H1: {
    fontSize: fontPixel(30),
    fontWeight: '700',
    lineHeight: lineHeightPixel(36),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
  },
  H2: {
    fontSize: fontPixel(30),
    fontWeight: '400',
    lineHeight: lineHeightPixel(36),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
  },
  H3: {
    fontSize: fontPixel(24),
    fontWeight: '700',
    fontFamily: 'Inter-Regular',
    color: ColorTheme.Black,
    lineHeight: lineHeightPixel(30),
  },
  H4: {
    fontSize: fontPixel(24),
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    color: ColorTheme.Black,
    lineHeight: lineHeightPixel(30),
  },
  H5: {
    fontSize: fontPixel(20),
    fontWeight: '700',
    fontFamily: 'Inter-Regular',
    color: ColorTheme.Black,
    lineHeight: lineHeightPixel(30),
  },
  H6: {
    fontSize: fontPixel(16),
    fontWeight: '700',
    fontFamily: 'Inter-Regular',
    color: ColorTheme.Black,
    lineHeight: lineHeightPixel(22),
  },
  H7: {
    fontSize: fontPixel(18),
    fontWeight: '700',
    fontFamily: 'Inter-Regular',
    color: ColorTheme.Black,
    lineHeight: lineHeightPixel(24),
  },
  H8: {
    fontSize: fontPixel(28),
    fontWeight: '700',
    lineHeight: lineHeightPixel(36),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
  },
  Body1: {
    fontSize: fontPixel(18),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
    lineHeight: lineHeightPixel(24),
    fontWeight: '400',
  },
  Body2: {
    fontSize: fontPixel(16),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
    lineHeight: lineHeightPixel(22),
    fontWeight: '400',
  },
  Body3: {
    fontSize: fontPixel(14),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
    lineHeight: lineHeightPixel(20),
    fontWeight: '400',
  },
  Body4: {
    fontSize: fontPixel(10),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
    lineHeight: lineHeightPixel(16),
    fontWeight: '400',
  },
  Body5: {
    fontSize: fontPixel(17),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
    lineHeight: lineHeightPixel(25),
    fontWeight: '400',
  },
  Body6: {
    fontSize: fontPixel(22),
    color: ColorTheme.Black,
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: ColorTheme.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default AppStyles;