import React, { useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useTheme, Badge, Icon, withBadge } from 'react-native-elements';
import CustomIcon from '../../shared/CustomIcon';
import { useSelector, useDispatch } from 'react-redux';
import DynamicText from '../../shared/DynamicText';
import { getUnreadNotificationCount } from './store/dispatchers';
import { useFocusEffect } from '@react-navigation/native';


function HeaderRight({ navigation, settingsData }) {
  const dispatch = useDispatch();
  const { colors, fontSize, fontFamily } = useTheme().theme;
  useEffect(() => {
    onRefresh()
  }, [])
  const onRefresh = () => {
    dispatch(getUnreadNotificationCount())
  }
  let notificationCount = useSelector(({ home }) => home.unreadNotificationCount)
  const icons = [
    // {
    //   iconUrl: settingsData.header.icons.login,
    //   title: settingsData.header.labels.login,
    //   name: 'login',
    // },
    {
      iconUrl: settingsData.header.icons.notification,
      title: settingsData.header.labels.notification,
      name: 'notifications',
    },
    // {
    //   iconUrl: settingsData.header.icons.search,
    //   title: settingsData.header.labels.search,
    //   name: 'search',
    // },
    {
      iconUrl: settingsData.commonIcons.menu,
    },
  ];
  useFocusEffect(() => {
    dispatch(getUnreadNotificationCount())
  })

  return icons.map((item, index) => {
    if (item.name === 'notifications') {
      return (
        <Pressable
          key={index}
          android_ripple={{ color: 'grey', borderless: true }}
          onPress={() => {
            item.name
              ? navigation.navigate(
                !item.screenType || item.screenType == 'custom'
                  ? item.name
                  : item.screenType,
                item,
              )
              : navigation.openDrawer();
          }}
          style={styles.pressableContainer}>
          <CustomIcon
            iconUrl={item.iconUrl}
            height={16}
            color={colors.black}
            width={24}
          />
          {notificationCount?.count > 0 ? <Badge value={notificationCount.count}
            status="warning"
            containerStyle={{ position: 'absolute', top: -5, right: 15 }}
          /> : null}

          <DynamicText text={item.title} style={styles.iconText(colors, fontSize, fontFamily)} />
        </Pressable>
      )
    } else {
      return (
        <Pressable
          key={index}
          android_ripple={{ color: 'grey', borderless: true }}
          onPress={() => {
            item.name
              ? navigation.navigate(
                !item.screenType || item.screenType == 'custom'
                  ? item.name
                  : item.screenType,
                item,
              )
              : navigation.openDrawer();
          }}
          style={styles.pressableContainer}>
          <CustomIcon
            iconUrl={item.iconUrl}
            height={16}
            color={colors.black}
            width={24}
          />
          <DynamicText text={item.title} style={styles.iconText(colors, fontSize, fontFamily)} />
        </Pressable>
      )
    }
  })
}

export default function Header({ navigation, title, iconName, ...props }) {
  const { colors } = useTheme().theme;
  let settingsData = useSelector(({ settings }) => settings.settingsData);
  return (
    <View style={styles.container(title, colors)}>
      <View style={styles.leftSection()}>
        <Image
          style={styles.image_smc}
          source={require('../../assets/images/SMC_logo.png')}
        />
        <Image
          style={styles.image}
          source={require('../../assets/images/ServiceConnectLogo.png')}
        />
      </View>
      <View style={styles.rightSection()}>
        {settingsData ? (
          <HeaderRight navigation={navigation} settingsData={settingsData} />
        ) : null}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: (title, colors) =>
    ScaledSheet.create({
      height: '48@ms',
      width: '100%',
      backgroundColor: colors.white,
      flexDirection: 'row',
    }),
  image: {
    height: '47@ms',
    width: '100@ms'    
  },
  image_smc: {
    height: '41@ms',
    width: '41@ms',
    marginLeft: '5@ms',
    marginRight: '12@ms',
  },
  leftSection: () => {
    return ScaledSheet.create({
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    });
  },
  rightSection: () =>
    ScaledSheet.create({
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }),
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
