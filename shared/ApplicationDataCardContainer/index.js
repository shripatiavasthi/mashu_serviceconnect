import React, {Children} from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export default function ApplicationDataCardContainer(children) {
  return <View style={styles.dataCardStyle}>{children.children}</View>;
}
const styles = ScaledSheet.create({
  dataCardStyle: {
    borderTopLeftRadius: '13@ms',
    borderTopRightRadius: '13@ms',
    backgroundColor: '#ffffff',
    marginTop:'12@ms',
    marginBottom:'22@ms',
    elevation: '7@ms',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
});
