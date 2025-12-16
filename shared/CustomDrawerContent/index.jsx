import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../settings/store/dispatchers';
import CustomIcon from '../CustomIcon';
import DynamicText from '../DynamicText';
import PrimaryButton from '../PrimaryButton';
import ItemList from './itemList';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';


const details = {
  name: '',
  userName: '',
  mobileNo: '',
};

export default CustomDrawerContent = props => {
  const { colors, fontSize, fontFamily } = useTheme().theme;
  const settingsData = useSelector(({ settings }) => settings.settingsData);
  // const location = useSelector(({ settings }) => settings.location);
  const insets = useSafeAreaInsets();
  const lang = useSelector(({ settings }) => settings.language);
  const token = useSelector(({ settings }) => settings.token);
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("LoggedOut, token - " + token);
  }
  return (
    <>
      <View style={styles.profileSection(colors)}>
        <View style={styles.closeDrawer}>
          <Pressable
            android_ripple={{ color: 'grey', borderless: true }}
            style={styles.pressableContainerClose}
            onPress={() => props.navigation.closeDrawer()}>
            <CustomIcon
              iconUrl={settingsData?.commonIcons.close}
              width={15}
              height={15}
            />
          </Pressable>
        </View>
        <View style={styles.profileSectionHeader}></View>
        <View style={styles.profileSectionBody}>
          <View style={styles.logoContainer}>
            <View style={styles.logoRoundBox(colors)}>
              <Image
                style={styles.drawerLogo}
                source={require('../../assets/images/logo.png')}
              />
            </View>
          </View>
          <View style={styles.profileDetailContainer}>
            {/* <DynamicText
              style={styles.tag(colors, fontSize, fontFamily)}
              text={settingsData?.sidebar.header.labels.name}>
              <>
                {': '}
                <Text style={styles.tagValue(colors, fontSize, fontFamily)}>
                  {details.name}
                </Text>
              </>
            </DynamicText>
            <DynamicText
              style={styles.tag(colors, fontSize, fontFamily)}
              text={settingsData?.sidebar.header.labels.userName}>
              <>
                {': '}
                <Text style={styles.tagValue(colors, fontSize, fontFamily)}>
                  {details.userName}
                </Text>
              </>
            </DynamicText>
            <DynamicText
              style={styles.tag(colors, fontSize, fontFamily)}
              text={settingsData?.sidebar.header.labels.mobileNo}>
              <>
                {': '}
                <Text style={styles.tagValue(colors, fontSize, fontFamily)}>
                  {details.mobileNo}
                </Text>
              </>
            </DynamicText> */}

            {/* {__DEV__ && location ? (
              <DynamicText
                style={styles.tag(colors, fontSize, fontFamily)}
                text={{ en: 'Location' }}>
                <>
                  {': '}
                  <Text style={styles.tagValue(colors, fontSize, fontFamily)}>
                    {location.latitude + "," + location.longitude}
                  </Text>
                </>
              </DynamicText>
            ) : null} */}
            <View style={styles.languageSection}>
              <Pressable
                onPress={() => {
                  sendAnalytics(events.language_changed, "English");
                  dispatch(setLanguage({ language: 'en' }))
                }}
                style={styles.languageSelector(
                  colors,
                  fontSize,
                  fontFamily,
                  lang == 'en',
                )}>
                <Text style={styles.langText(colors, lang == 'en')}>
                  English
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  sendAnalytics(events.language_changed, "Español");
                  dispatch(setLanguage({ language: 'es' }))
                }}
                style={styles.languageSelector(
                  colors,
                  fontSize,
                  fontFamily,
                  lang == 'es',
                )}>
                <Text style={styles.langText(colors, lang == 'es')}>
                  Español
                </Text>
              </Pressable>
            </View>
          </View>
          {/* <Pressable
            android_ripple={{ color: 'grey', borderless: true }}
            style={styles.pressableContainerEdit}>
            <CustomIcon
              iconUrl={settingsData?.commonIcons.edit}
              width={15}
              height={15}
            />
          </Pressable> */}
        </View>
      </View>

      <View style={styles.container}>
        <DrawerContentScrollView
          contentContainerStyle={{
            paddingTop: insets.top,
            paddingStart: insets.left,
            paddingEnd: insets.right,
          }}
          {...props}>
          {settingsData ? (
            <ItemList menuItems={settingsData.sidebar.menus} {...props} />
          ) : null}

          {/* <View style={styles.logoutOuter}>
            <View style={styles.logoutContainer}>
              <PrimaryButton
                buttonContainerStyle={styles.buttonContainerStyle}
                // title={texts.Logout}
                title={{ en: 'Logout' }}
                onPress={handleLogout}
              />
            </View>
          </View> */}
          {/* <TouchableOpacity activeOpacity={0.8} onPress={() => { console.log("Logout Pressed") }} style={styles.buttonContainerStyle(colors, fontSize, fontFamily)}><Text style={styles.logoutTxt(colors, fontSize, fontFamily)}>Logout</Text></TouchableOpacity> */}
        </DrawerContentScrollView>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  drawerLabelStyle: (colors, fontSize, fontFamily, focused) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      marginLeft: '-15@ms',
      color: focused ? colors.white : colors.black,
      fontFamily: focused ? fontFamily.bold : fontFamily.regular,
    }),
  logoutOuter: {
    marginVertical: '10@ms',
    marginHorizontal: '24@ms',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  logoutContainer: {
    // flex: 1,
    alignItems: 'center',
    borderRadius: '50@ms',
    paddingHorizontal: 0,
    paddingStart: 0,
    overflow: 'hidden',
  },
  buttonContainerStyle: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      flex: 1,
      paddingStart: 0,
      paddingEnd: 0,
      marginVertical: '10@ms',
      marginHorizontal: '24@ms',
      // alignItems: 'center',
      height: '52@ms',
      backgroundColor: colors.secondary,
      borderRadius: '50@ms',
      justifyContent: 'center',
    }),
  logoutTxt: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      color: colors.primaryText,
      fontSize: fontSize.h2,
      fontFamily: fontFamily.bold,
      marginLeft: '3@ms',
      marginRight: '3@ms',
      textAlign: 'center',
    }),
  buttonStyle: colors =>
    ScaledSheet.create({
      justifyContent: 'center',
      alignItems: 'center',
      height: '52@ms',
      width: '291@ms',
      borderRadius: '50@ms',
      backgroundColor: colors.secondary,
    }),
  buttonTitleStyle: (fontSize, fontFamily) => ({
    fontSize: fontSize.h2,
    fontFamily: fontFamily.bold,
  }),
  container: {
    flex: 1,
    //backgroundColor: 'orange',
  },
  closeDrawer: {
    alignItems: 'flex-end',
  },
  drawerTopIcon: { height: '15@ms', width: '15@ms' },
  drawerLogo: { height: '44@ms', width: '30@ms' },
  logoContainer: {
    alignItems: 'center',
    flex: 0.4,
  },
  logoRoundBox: colors =>
    ScaledSheet.create({
      height: '60@ms',
      width: '60@ms',
      borderRadius: '30@ms',
      borderWidth: '1@ms',
      borderColor: colors.borderColor,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    }),
  pressableContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: '20@ms',
  },
  pressableContainerEdit: {
    marginRight: '20@ms',
    padding: '5@ms',
    // borderWidth: 1,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  pressableContainerClose: {
    // alignItems: 'flex-end',
    marginTop: '10@ms',
    marginEnd: '10@ms',
    padding: '5@ms',
  },
  profileDetailContainer: {
    flex: 1,
    paddingTop: '1@ms',
    // /backgroundColor: 'pink',
  },
  profileSection: colors =>
    ScaledSheet.create({
      // height: '158@ms',
      paddingBottom: '6@ms',
      width: '100%',
      paddingEnd: '10@ms',
      backgroundColor: colors.primaryLight,
    }),
  profileSectionHeader: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',

    flexDirection: 'row',
    // /backgroundColor: 'pink',
  },
  profileSectionBody: {
    // flex: 1,
    //backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: "center"
  },
  tag: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      color: colors.black,
      marginBottom: '7@ms',
      fontFamily: fontFamily.regular,
      fontSize: fontSize.h3,
    }),
  tagValue: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      color: colors.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.h3,
    }),
  languageSection: {
    flexDirection: 'row',
    // width: "100%",
    paddingRight: '20@ms',
    justifyContent: 'space-between',
  },
  languageSelector: (colors, fontSize, fontFamily, selected) =>
    ScaledSheet.create({
      backgroundColor: selected ? colors.secondary : colors.primaryText,
      color: 'red',
      width: '90@ms',
      height: '27@ms',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: '16@ms',
      borderColor: colors.secondary,
    }),
  langText: (colors, selected) =>
    ScaledSheet.create({
      color: selected ? colors.primaryText : colors.secondary,
    }),
});
