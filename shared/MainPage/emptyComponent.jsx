import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import DynamicText from '../DynamicText';

const EmptyComponent = ({pageTitle}) => {
  if (pageTitle) {
    return (
      <View style={styles.empty}>
        <DynamicText text={{en: "No", es: "No"}} style={styles.text} />
        <DynamicText text={pageTitle} style={styles.text} />
      </View>
    );
  }
  return null;
};

export default EmptyComponent;

const styles = ScaledSheet.create({
  empty: {height: '200@ms', justifyContent: 'center', alignItems: 'center', flexDirection: "row"},
  text: {textTransform: 'capitalize', marginRight: 4, color:"black"},
});
