import React from 'react';
import { View, Pressable } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import CustomIcon from '../../../shared/CustomIcon';
import { useTheme } from 'react-native-elements';
import { useSelector } from 'react-redux';

export default function SearchBarLeft({ route, navigation, ...props }) {
  const { colors } = useTheme().theme;
  let settingsData = useSelector(({ settings }) => settings.settingsData);

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: 'grey', borderless: true }}
        onPress={() => navigation.goBack()}>
        <CustomIcon
          color={colors.white}
          iconUrl={settingsData?.commonIcons.back}
          height={15}
          width={24}
        />
      </Pressable>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingLeft: '12@ms',
    flex: 0.3,
    //
  },
  image: {
    height: '30@ms',
    width: '76@ms',
  },
});
