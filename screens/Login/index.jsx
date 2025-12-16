import React from 'react';

import { View, ScrollView, Text, Dimensions, Image, Pressable } from 'react-native';

import { useTheme } from 'react-native-elements';

import { ScaledSheet } from 'react-native-size-matters';
import LoginPath from '../../assets/svg/LoginPath.svg'
import LoginLock from '../../assets/svg/LoginLock'
import LoginUser from '../../assets/svg/LoginUser'
import LoginInput from './LoginInput';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Login({ navigation, route }) {
  const { colors, fontFamily, fontSize } = useTheme().theme;
  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.goBack}>
          <LoginPath />
          <Text style={{ marginStart: 10, color: colors.lightGray, fontWeight: "bold", fontSize: 20 }}>Back</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.container(colors)} keyboardShouldPersistTaps="handled">
        <View style={styles.contentView}>
          <Image
            style={styles.serviceConnectLogo}
            source={require('../../assets/images/ServiceConnectLogo.png')}
          />
          <Text style={styles.infoText(colors, fontSize, fontFamily)}>
            You need to login your account to view available services.
          </Text>
        </View>
        <View style={styles.loginContentView(colors)}>
          <Text style={styles.loginTitle} >Login</Text>
          <LoginInput placeholder="User Name" icon={LoginUser} />
          <LoginInput icon={LoginUser} placeholder="Password" type="password" secureTextEntry={true} icon={LoginLock} />
          <Pressable style={styles.loginBtn}>
            <Text style={styles.logingBtnTxt}>LOGIN</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
const styles = ScaledSheet.create({
  container: (colors) => ({
    backgroundColor: colors.primary,
  }),

  contentView: {
    minHeight: '177@ms',
    flex: 1,

    backgroundColor: 'white',
    paddingLeft: '10@ms',
  },
  header: { height: '44@ms', backgroundColor: 'white' },
  infoText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      color: colors.lightGray,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.h2,
      marginTop: '15@ms',
    }),
  loginContentView: (colors) => ScaledSheet.create({
    minHeight: '445@ms',
    flex: 1.5,
    backgroundColor: colors.primary,
    paddingHorizontal: "20@ms"
  }),

  serviceConnectLogo: {
    height: '83@ms',
    width: '209@ms',
  },
  goBack: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  goBackBtn: {
    color: "red",
    height: 30
  },
  loginTitle: {
    color: "white",
    fontSize: '24@ms',
    fontWeight: "bold",
    marginVertical: '30@ms'
  },
  loginBtn: {
    backgroundColor: "white",
    borderRadius: "50@ms",
    height: "60@ms",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10@ms"
  },
  logingBtnTxt: {
    fontSize: '22@ms',
    fontWeight: "bold",
    color: "black"
  }
});
