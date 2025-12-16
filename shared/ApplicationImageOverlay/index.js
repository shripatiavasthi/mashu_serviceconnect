import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import ApplicationRemoteImage from '../ApplicationRemoteImage';

export default function ApplicationImageOverlay({
  style,
  imageStyle,
  overlayStyle,
  imageId,
  resizeMode = 'cover',
  children,
  showBorderRadius = true,
}) {
  const styles = ScaledSheet.create({
    backgroundImage: {
      width: '100%',     
    },
    overlay: {
      borderRadius: showBorderRadius ? '10@ms' : '0@ms',
      backgroundColor: `rgba(0, 126, 126,0.8)`,
    },
  });

  return (
    <View style={style}>
      <ApplicationRemoteImage
        style={styles.backgroundImage}
        imageStyle={imageStyle}
        imageId={imageId}
        resizeMode={resizeMode}>
        <View style={[styles.overlay, overlayStyle]}>{children}</View>
      </ApplicationRemoteImage>
    </View>
  );
}