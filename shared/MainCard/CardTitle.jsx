import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import CustomIcon from '../CustomIcon';
import DynamicText from '../DynamicText';

export default function CardTitle(props) {
  const {colors, fontFamily, fontSize} = useTheme().theme;

  return (
    <View style={[styles.header, {...props.titleStyle}]}>
      {props.iconUrl && (
        <View style={styles.iconContainer}>
          <CustomIcon
            iconUrl={props.iconUrl}
            iconName={props.iconName}
            width={props.iconWidth}
            height={props.iconHeight}
          />
        </View>
      )}

      {props.title && (
        <View style={styles.titleContainer}>
          <DynamicText
            textType={props.textType}
            text={props.title.text}
            textTypeLabel={props.title.textTypeLabel}
            //numberOfLines={props.titleLine ? props.titleLine : 1}
            style={[
              styles.title(colors, fontFamily, fontSize),
              props.titleTextStyle,
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  header: {
    padding: '5@ms',
    flexDirection: 'row',
  },
  titleContainer: {flex: 1, justifyContent: 'center'},
  iconContainer: {paddingRight: '5@ms'},
  title: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      paddingLeft: '2@ms',
      lineHeight: '20@ms',
      top: '3@ms',
      //fontWeight: 'bold',
      color: colors.primary,
      fontFamily: fontFamily.bold,
    }),
});
