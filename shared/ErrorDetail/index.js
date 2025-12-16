import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export default function ErrorDetail({error}) {
  return (
    <View style={styles.errorContainer}>
      {/* <Text>Error getting result</Text> */}
      <Text note>{error.message}</Text>
    </View>
  );
}
const styles = ScaledSheet.create({
  errorContainer: {height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: "lightgray"},
});
