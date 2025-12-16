import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import CustomIcon from '../CustomIcon';
import { useTheme } from 'react-native-elements';
import { useSelector } from 'react-redux';
import DynamicText from '../DynamicText';
import { sendAnalytics, events, sendScreenView } from '../../utils/firebaseAnalytics';

export default function AppBarContent({
  title,
  iconUrl,
  headerName,
  navigation,
  ...props
}) {
  const { colors, fontSize, fontFamily } = useTheme().theme;

  let icon = useSelector(({ settings }) =>
    headerName && settings.settingsData
      ? {
        iconUrl: settings.settingsData.header.icons[headerName],
        title: settings.settingsData.header.labels[headerName],
      }
      : { title, iconUrl },
  );
  useEffect(() => {    
    sendScreenView(icon?.title?.en);    
  }, [icon.title]);

  return (
    <View style={styles.container}>
      <View style={styles.iconTextContainer}>
        <View style={styles.iconContainer}>
          <CustomIcon
            color={colors.white}
            iconUrl={icon.iconUrl}
            height={25}
            width={32}
          />
        </View>

        <DynamicText
          text={icon.title}
          numberOfLines={2}
          style={styles.iconText(colors, fontSize, fontFamily)}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 2,
    // /backgroundColor: 'red',
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: '2@ms',
  },
  iconContainer: {
    paddingRight: '10@ms',
  },
  iconTextContainer: {
    // paddingHorizontal: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      color: colors.white,
      fontFamily: fontFamily.bold,
      lineHeight: '23@ms',
      paddingTop: '5@ms',
      // paddingEnd: '30@ms'
      // marginEnd: '20@ms',
      width: '85%',
      // borderWidth: 1,
      // width: '240@ms'
    }),
});
