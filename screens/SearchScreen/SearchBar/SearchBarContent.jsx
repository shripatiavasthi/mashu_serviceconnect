import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import CustomIcon from '../../../shared/CustomIcon';
import { useTheme } from 'react-native-elements';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function SearchBarContent({
  navigation,
  iconName,
  iconUrl,
  ...props
}) {
  const { colors, fontSize, fontFamily } = useTheme().theme;
  const textRef = useRef(null);
  useEffect(() => {
    textRef.current.focus();
  })
  return (
    <View style={styles.container(colors)}>
      <View style={styles.iconTextContainer}>
        <View style={styles.iconContainer}>
          <CustomIcon
            color={colors.black}
            iconUrl={iconUrl}
            height={25}
            width={32}
          />
        </View>
        <TextInput placeholder='Search' ref={textRef} style={styles.input(colors, fontSize, fontFamily)} />        
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: colors => ScaledSheet.create({
    flex: 2,
    backgroundColor: colors.primaryText,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: '10@ms',
    margin: '10@ms',
    borderRadius: '4@ms'
  }),
  iconContainer: {
    paddingRight: '10@ms',
  },
  iconTextContainer: {
    //paddingHorizontal: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  iconText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.extraLarge,
      color: colors.white,
      fontFamily: fontFamily.bold,
      paddingTop: '2@ms',
    }),
  input: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      color: colors.black,
      flex: 1
    }),
});
