import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import SearchBarContent from './SearchBarContent';
import SearchBarLeft from './SearchBarLeft';

export default function SearchBar({ navigation, route }) {
  const { colors } = useTheme().theme;
  return (
    <View style={styles.container(colors)}>
      <SearchBarLeft navigation={navigation} />
      <SearchBarContent navigation={navigation} iconUrl={route.params.iconUrl} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: (colors) =>
    ScaledSheet.create({
      height: '60@ms',
      width: '100%',
      backgroundColor: colors.primary,
      flexDirection: 'row',
    }),
});
