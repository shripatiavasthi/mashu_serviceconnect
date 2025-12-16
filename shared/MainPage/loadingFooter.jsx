import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Loader from '../Loader';

export const LoadingFooter = ({loadingMore}) => {
  if (loadingMore) {
    return (
      <View style={styles.loadingMore}>
         <Loader />
      </View>
    );
  }
  return <View style={styles.spacer}></View>;
};

const styles = ScaledSheet.create({
  loadingMore: {
    position: 'relative',
    width: 100,
    height: 100,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  spacer: {
    height: '200@ms',
    height: '15@ms',
  },
});
