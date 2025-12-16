import React from 'react';
import {View, Pressable} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import CustomIcon from '../CustomIcon';
import {useTheme} from 'react-native-elements';
import {useSelector} from 'react-redux';

export default function AppBarRight({navigation}) {
  const {colors} = useTheme().theme;
  let settingsData = useSelector(({settings}) => settings.settingsData);

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{color: 'grey', borderless: true}}
        onPress={() => navigation.openDrawer()}
        style={styles.pressableContainer}>
        <CustomIcon
          color={colors.white}
          iconUrl={settingsData?.commonIcons.menu}
          height={15}
          width={24}
        />
      </Pressable>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 0.3,
    // backgroundColor: 'pink',
    paddingRight: '7@ms',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  pressableContainer: {
    //backgroundColor: 'red',
    paddingHorizontal: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.standard,
      color: colors.black,
      fontFamily: fontFamily.regular,
      paddingTop: '2@ms',
    }),
});
