import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import AppBarContent from './AppBarContent';
import AppBarLeft from './AppBarLeft';
import AppBarRight from './AppBarRight';

export default function AppBar({navigation, route}) {
  const {colors} = useTheme().theme;
  return (
    <View style={styles.container(colors)}>
      <AppBarLeft navigation={navigation} />
      <AppBarContent
        navigation={navigation}
        title={route.params.title || route.params.displayName}
        iconUrl={route.params.iconUrl}
        headerName={route.params.headerName}
      />
      <AppBarRight navigation={navigation} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: colors =>
    ScaledSheet.create({
      minHeight: '60@ms',
      width: '100%',
      backgroundColor: colors.primary,
      flexDirection: 'row',
    }),
});
