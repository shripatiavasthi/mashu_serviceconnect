import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
const Loader = () => {
  const {colors} = useTheme().theme;
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Loader;

const styles = ScaledSheet.create({
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
