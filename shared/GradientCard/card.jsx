import * as React from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  Linking,
  Pressable,
  Dimensions
} from 'react-native';
import { useTheme } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { ScaledSheet } from 'react-native-size-matters';
import DynamicText from '../DynamicText';
import CustomIcon from '../CustomIcon';
import BtnStack from './btnStack';
import Location from '../../assets/svg/Location.svg';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';


function CardComponent({
  item,
  actionIcons,
  textType,
  labels,
  navigation,
  bgImage,
}) {
  const { colors, fontSize, fontFamily } = useTheme().theme;
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 3,
        paddingTop: 5,
        justifyContent: 'space-between',
      }}>
      <View style={{ flex: 1 }} />
      <View style={styles.heading(bgImage)}>
        <DynamicText
          text={item.title}
          style={styles.headingText(colors, fontSize, fontFamily)}
        />
      </View>
      <View style={styles.overViewContainer(bgImage)}>
        {item.description && (
          <DynamicText
            text={item.description}
            textType={textType}
            textTypeLabel="list.description"
            style={styles.headingText(colors, fontSize, fontFamily)}
          />
        )}
      </View>
      {item.address ? (
        <View style={styles.addressSection}>
          <Text>
            <View style={{ paddingRight: 6 }}>
              <Location height={14} fill="white" />
            </View>
            <DynamicText
              text={item.address.address}
              style={styles.addressText(colors, fontSize, fontFamily)}
            />
            {item.distance ? (
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                {' '}• {item.distance} mi
              </Text>
            ) : null}
          </Text>
        </View>
      ) : null}
      {item.email && (
        <View style={styles.emailContainer}>
          <Pressable onPress={() => {
            sendAnalytics(events.email_link_clickeded, item.email);
            Linking.openURL(`mailto:${item.email}`)
          }}>
            {({ pressed }) => (
              <Text style={styles.emailTxt(colors, pressed)}>{item.email}</Text>
            )}
          </Pressable>
        </View>
      )}
      {labels && (
        <BtnStack
          item={item}
          colors={colors}
          actionIcons={actionIcons}
          labels={labels}
          navigation={navigation}
          itemName={item.title}
        />
      )}
    </View>
  );
}

export default function GradientCard({
  item,
  actionIcons,
  textType,
  labels,
  navigation,
  cardStyle,
}) {
  return (
    <View
      style={{
        ...styles.container(item.backgroundImageUrl != null),
        ...cardStyle,
      }}>
      {item.backgroundImageUrl ? (
        <>
          <ImageBackground
            style={styles.bgImage}
            imageStyle={styles.bgImageStyle}
            source={{ uri: item.backgroundImageUrl }}>
            <LinearGradient
              colors={['#036CB6', '#036CB690', '#ffffff00']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradientStyle}>
              <CardComponent
                item={item}
                actionIcons={actionIcons}
                labels={labels}
                textType={textType}
                bgImage={true}
                navigation={navigation}
              />
            </LinearGradient>
          </ImageBackground>
        </>
      ) : (
        <CardComponent
          item={item}
          actionIcons={actionIcons}
          labels={labels}
          textType={textType}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  emailTxt: (colors, pressed) =>
    ScaledSheet.create({
      textDecorationLine: 'underline',
      color: pressed ? 'black' : colors.white,
      lineHeight: '23@ms',
    }),
  addressSection: {
    //flex: 0.5,
    flexDirection: 'row',
    paddingLeft: '13@ms',
    paddingRight: '22@ms',
    paddingBottom: '4@ms',
    alignItems: 'center',
  },
  bgImageStyle: { borderTopLeftRadius: 10, borderTopRightRadius: 10, height: (Dimensions.get('window').width - 30) / 2, },
  emailContainer: {
    paddingLeft: '13@ms',
    paddingRight: '13@ms',
    paddingBottom: '13@ms',
  },
  container: bgImage =>
    ScaledSheet.create({
      //width: '336@ms',
      minHeight: bgImage ? '200@ms' : '170@ms',
      marginVertical: '8@ms',
      //backgroundColor: 'red',
      backgroundColor: '#036CB6',
      borderRadius: '10@ms',
    }),
  bgImage: {
    // width: '336@ms',
    //height: '248@ms',
    //margin: '8@ms',
    //backgroundColor: 'red',
    backgroundColor: '#036CB6',
    borderRadius: '10@ms',
  },
  heading: bgImage =>
    ScaledSheet.create({
      justifyContent: 'center',
      paddingLeft: '13@ms',
      paddingRight: '13@ms',
      paddingBottom: '4@ms',
      marginTop: bgImage ? '64@ms' : '12@ms',
      //backgroundColor: "skyblue"
    }),

  headingText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      color: colors.white,
      fontFamily: fontFamily.bold,
      //textAlign: 'justify',
      lineHeight: '23@ms',
    }),
  overViewContainer: bgImage =>
    ScaledSheet.create({
      flexDirection: 'row',
      paddingLeft: '13@ms',
      paddingRight: '13@ms',
      paddingBottom: '13@ms',
      //backgroundColor: 'green',
      minHeight: bgImage ? '0@ms' : '57@ms',
    }),
  locationIconContainer: { justifyContent: 'center', alignItems: 'center' },
  addressText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: '#D2E9F9',
      fontFamily: fontFamily.regular,
      lineHeight: '23@ms',
      paddingLeft: '2@ms',
      paddingBottom: '10@ms',
      textAlign: 'center',
    }),
  addressTextContainer: {
    left: '2@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientStyle: {
    //position: 'absolute',

    marginTop: '50@ms',
    // left: 0,
    // right: 0,
    // bottom: '0@ms',
    //height: '100%',
    borderBottomLeftRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
  },
});
