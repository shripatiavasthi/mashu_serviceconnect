import {moderateScale} from 'react-native-size-matters';
const config = {
  colors: {
    primary: '#036CB6',
    primaryLight: '#f8fbfe',
    primaryText: '#FFFFFF',
    lightGrey: '#8E8E8E',
    white: 'white',
    borderColor: '#DDEDF8',
    black: 'black',
    secondary: '#ED8C28',
    textBlue: '#D2E9F9',
    textEmail: '#FBFBFB',
    grey: '#898989'
  },
  fontFamily: {
    regular: 'ArialMT',
    bold: 'Arial-BoldMT',
  },
  fontSize: {
    standard: moderateScale(11),
    h4odd: moderateScale(13),
    h3odd: moderateScale(15),
    h1: moderateScale(18),
    h2: moderateScale(16),
    h3: moderateScale(14),
    h4: moderateScale(12),
    h5: moderateScale(10),
    small: moderateScale(9),
    large: moderateScale(20),
    extraLarge: moderateScale(21),
  },
};
export default config;
