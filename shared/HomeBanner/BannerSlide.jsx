import * as React from 'react';
import { Dimensions, ImageBackground, Linking, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import DynamicText from '../DynamicText';
import PrimaryButton from '../PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';


export default function BannerSlide({
  slide,
  textType,
  labels,
  navigation,
  ...props
}) {
  const { colors, fontSize, fontFamily } = useTheme().theme;
  return (
    <>
      <ImageBackground
        source={{ uri: slide.imageUrl }}
        resizeMode="cover"
        style={styles.imageBackground(colors)}>
        <LinearGradient
          colors={['#05315078', '#052A46ED']}
          start={{ x: 0, y: 0.9 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientStyle}>
          <View style={styles.dataContainer(colors, fontSize, fontFamily)}>
            <View style={styles.headerContainer()}>
              <DynamicText
                text={slide.title}
                numberOfLines={3}
                textType={textType}
                textTypeLabel="banners.title"
                style={styles.header(colors, fontSize, fontFamily)}
              />
            </View>
            <View style={styles.descriptionContainer()}>
              {slide.description ? (
                <DynamicText
                  numberOfLines={3}
                  text={slide.description}
                  textTypeLabel="banners.description"
                  textType={textType}
                  style={styles.subHeader(colors, fontSize, fontFamily)}
                />
              ) : null}
            </View>
            {slide.link ? (
              <PrimaryButton
                buttonContainerStyle={styles.buttonContainerStyle()}
                buttonStyle={{ backgroundColor: colors.white }}
                buttonTitleStyle={styles.buttonTitleStyle(
                  colors,
                  fontSize,
                  fontFamily,
                )}
                title={labels.actionButton}
                onPress={() => {
                  sendAnalytics(events.link_clicked, slide.link);
                  Linking.openURL(slide.link)
                }}
              />
            ) : null}
          </View>
        </LinearGradient>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainerStyle: () =>
    ScaledSheet.create({
      height: '25@ms',
      width: '102@ms',
      borderRadius: '18@ms',
      backgroundColor: 'green',
      position: 'absolute',
      bottom: '-20@ms',
      right: '20@ms',
    }),
  buttonTitleStyle: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({ color: colors.primary, fontSize: fontSize.h4 }),
  header: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h1,
      fontFamily: fontFamily.bold,
      color: colors.white,
      lineHeight: '23@ms',
      textTransform: 'uppercase',
    }),
  imageBackground: colors =>
    ScaledSheet.create({
      flex: 1,
      backgroundColor: colors.primary,
      height: Dimensions.get('window').width / 2,
      width: Dimensions.get('window').width,
    }),
  dataContainer: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      // width: '60%',
      // paddingRight: '8@ms',
      flex: 1,
      paddingTop: '8@ms',
      paddingBottom: '5@ms',
      paddingHorizontal: '19@ms',
      marginBottom: '36@ms',
    }),
  descriptionContainer: () =>
    ScaledSheet.create({
      flex: 1,
      marginTop: -5,
    }),
  headerContainer: () =>
    ScaledSheet.create({
      // paddingBottom: '3@ms',
    }),
  note: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h4odd,
      color: colors.white,
      fontFamily: fontFamily.regular,
      paddingTop: '3@ms',
    }),
  subHeader: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h4odd,
      color: colors.white,
      lineHeight: '20@ms',
    }),
  gradientStyle: {
    flex: 1,
  },
});
