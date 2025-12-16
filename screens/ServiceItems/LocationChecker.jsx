import { View, Pressable, Linking, Text, Platform, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import React from 'react'
import { Overlay, useTheme } from 'react-native-elements';
import CustomIcon from '../../shared/CustomIcon';
import Map_Icon from '../../assets/svg/Map_Icon.svg'
import DynamicText from '../../shared/DynamicText'
import PrimaryButton from '../../shared/PrimaryButton';
import { TouchableHighlight } from 'react-native-gesture-handler';
import constants from '../../constants';

const openMap = (_toCoord) => {
  Linking.openURL(
    `${Platform.OS === 'ios'
      ? `https://maps.apple.com/`
      : 'https://maps.google.com/'
    }?daddr=${_toCoord.latitude},${_toCoord.longitude}`);
};

const LocationChecker = ({ visible, setVisible, location }) => {
  const { colors, fontFamily, fontSize } = useTheme().theme;
  // const [visible, setVisible] = useState(true)

  return (
    <Overlay isVisible={visible} fullScreen={true} backdropStyle={{ borderWidth: 1 }} overlayStyle={styles.overlayStyle}>
      <View style={styles.container(colors)}>
        <View style={styles.closeDrawer}>
          <Pressable
            android_ripple={{ color: 'grey', borderless: true }}
            style={styles.pressableContainerClose}
            onPress={() => setVisible(false)}>
            <CustomIcon
              iconName="CrossIcon"
              width={15}
              height={15}
            />
          </Pressable>
        </View>
        <Map_Icon width="100%" />
        {/* <CustomIcon iconName="Map_Icon" width={}/> */}
        <DynamicText
          text={constants.openMapTitle}
          style={styles.msg(colors, fontFamily, fontSize)}
        />

        <PrimaryButton
          buttonStyle={styles.buttonStyle(colors)}
          title={constants.openMapEnable}
          buttonTitleStyle={styles.buttonTitleStyle(colors, fontSize)}
          onPress={() => {
            Linking.openSettings();
            setVisible(false)
          }}
        />
        <PrimaryButton
          buttonStyle={styles.buttonStyle(colors, true)}
          title={constants.openMapContinue}
          buttonTitleStyle={styles.buttonTitleStyle(colors, fontSize, true)}
          onPress={() => {
            setVisible(false)
            openMap({ latitude: location.lat, longitude: location.lng })
          }}
        />
        {/* <TouchableOpacity activeOpacity={0.8} style={styles.btnConatinaer(colors)} onPress={() => {
          Linking.openSettings();
          setVisible(false)
        }}>
          <DynamicText text={constants.openMapEnable} style={styles.btnTitle(colors, fontSize, fontFamily)} />

        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.btnConatinaer(colors, true)} onPress={() => {
          setVisible(false)
          openMap({ latitude: location.lat, longitude: location.lng })
        }}>
          <DynamicText text={constants.openMapContinue} style={styles.btnTitle(colors, fontSize, fontFamily, true)} />
        </TouchableOpacity> */}
      </View>
    </Overlay>
  )
}

export default LocationChecker

const styles = ScaledSheet.create({
  overlayStyle: {
    backgroundColor: "#000000db",
    paddingTop: "76@ms"
  },
  container: (colors) => ScaledSheet.create({
    borderRadius: "8@ms",
    backgroundColor: colors.white,
    paddingHorizontal: "37@ms",
    paddingVertical: "14@ms",
    marginHorizontal: "5@ms"
  }),
  closeDrawer: {
    alignItems: "flex-end",
    position: "absolute",
    right: 0
  },
  pressableContainerClose: {
    padding: '5@ms'
  },
  msg: (colors, fontFamily, fontSize) => ScaledSheet.create({
    color: colors.primary,
    fontSize: fontSize.extraLarge,
    fontFamily: fontFamily.bold,
    textAlign: "center"
  }),
  buttonStyle: (colors, outlined) => ScaledSheet.create({
    width: "210@ms",
    padding: 0,
    height: "33@ms",
    borderWidth: outlined ? 1 : 0,
    backgroundColor: outlined ? "transparent" : colors.secondary,
    borderColor: colors.secondary,
    marginVertical: "8@ms"
  }),
  buttonTitleStyle: (colors, fontSize, outlined) => ScaledSheet.create({
    color: outlined ? colors.secondary : colors.white,
    fontSize: fontSize.h4,
    textTransform: "uppercase"
  }),
  btnConatinaer: (colors, outlined) => ScaledSheet.create({
    alignItems: "center"
  }),
  btnTitle: (colors, fontSize, fontFamily, outlined) => ScaledSheet.create({
    color: outlined ? colors.secondary : colors.white,
    fontSize: fontSize.h4,
    backgroundColor: outlined ? colors.white : colors.secondary,
    width: "220@ms",
    // height: "33@ms",
    paddingVertical: "6@ms",
    borderRadius: "18@ms",
    marginVertical: '10@ms',
    justifyContent: "center",
    borderColor: outlined ? colors.secondary : "transparent",
    borderWidth: 1,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: fontFamily.bold
  })
})