import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-elements';
import { getStatusBarHeight } from './height'

const offlineColor = '#353536';

const StatusBar_ = () => {
  const {colors} = useTheme().theme;
  let backgroundColor = useSelector(({settings}) =>
    settings.isConnected ? colors.primary : offlineColor,
  );

  return (
    <View
      style={{
        height: getStatusBarHeight(),
        backgroundColor: backgroundColor,
      }}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

export default StatusBar_;
