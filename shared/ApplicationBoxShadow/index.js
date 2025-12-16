import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export default function ApplicationBoxShadow({style, children}) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = ScaledSheet.create({
  container: {
    borderRadius: '8@ms',
    shadowColor: 'rgba(0, 0, 0, 0.18)',
    shadowOpacity: '0.4@ms',
    shadowRadius: '2@ms',
    shadowOffset: {
      width: '0@ms',
      height: '2@ms',
    },
    elevation: '2@ms',
  },
});
