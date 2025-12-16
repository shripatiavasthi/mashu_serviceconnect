import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import CustomIcon from '../CustomIcon';
import {useTheme} from 'react-native-elements';
import {useSelector} from 'react-redux';

export default function AppBarLeft({navigation}) {
  const {colors} = useTheme().theme;
  const settingsData = useSelector(({settings}) => settings.settingsData);

  return (
    <Pressable
      style={styles.container}
      android_ripple={{color: 'grey', borderless: true}}
      onPress={() => {       
        navigation.goBack();
      }}>
      <CustomIcon
        color={colors.white}
        iconUrl={settingsData?.commonIcons.back}
        height={15}
        width={24}
      />
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
  },
});
