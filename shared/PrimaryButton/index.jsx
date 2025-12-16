import React from 'react';
import { Button, useTheme } from 'react-native-elements';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import CustomIcon from '../CustomIcon';
import translation from '../../utils/Translation';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';


export default function PrimaryButton(props) {
  const { colors, fontFamily, fontSize } = useTheme().theme;
  return (
    <Button
      type={props.type || 'solid'}
      containerStyle={[
        styles.buttonContainerStyle,
        { ...props.buttonContainerStyle },
      ]}
      onPress={() => {
        sendAnalytics(events.button_clicked, props.title.en);
        props.onPress()
      }}
      titleStyle={[
        styles.buttonTitleStyle(fontSize, fontFamily),
        { ...props.buttonTitleStyle },
      ]}
      buttonStyle={[styles.buttonStyle(colors), { ...props.buttonStyle }]}
      icon={
        <CustomIcon
          color={props.color || colors.primary}
          iconName={props.iconName}
          iconUrl={props.iconUrl}
          width={moderateScale(props.iconWidth || props.iconSize || 25)}
          height={moderateScale(props.iconHeight || props.iconSize || 25)}
        />
      }
      disabled={props.disabled}
      loading={props.loading}
      loadingProps={{
        size: 'large',
        color: 'rgba(111, 202, 186, 1)',
      }}
      title={translation(props.title)}
    />
  );
}

const styles = ScaledSheet.create({
  buttonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: colors =>
    ScaledSheet.create({
      justifyContent: 'center',
      alignItems: 'center',
      height: '52@ms',
      width: '280@ms',
      borderRadius: '50@ms',
      backgroundColor: colors.secondary,
    }),
  buttonTitleStyle: (fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      fontFamily: fontFamily.bold,
      marginLeft: '6@ms',
      marginRight: '3@ms',
      textTransform: 'capitalize',
    }),
});
