import React from 'react';
import { View, Text } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { Avatar } from 'react-native-elements';
import { useTheme } from 'react-native-elements';
import PrimaryButton from '../PrimaryButton';
import * as crashlytics from '../../utils/Crashlytics'

export default function ContactInfo(props) {
  const { colors, fontFamily, fontSize } = useTheme().theme;
  return (
    <>
      {props.contacts.map((item, index) => {
        return (
          <View key={index} style={styles.conatiner}>
            <View style={styles.thumbnailSection}>
              <Avatar
                source={{
                  uri: item.uri,
                }}
                size={moderateScale(50)}
                rounded
                title="MT"
                onPress={() => crashlytics.log('Works!')}
                activeOpacity={0.7}
              />
            </View>
            <View style={styles.detailSection}>
              <View style={styles.infoContainer}>
                <Text style={styles.name(colors, fontFamily, fontSize)}>
                  {item.name}
                </Text>
                <Text style={styles.desgnation(colors, fontFamily, fontSize)}>
                  {item.designation}
                </Text>
              </View>
              <View style={styles.buttonsContainer}>
                {item.buttons.map((bitem, bindex) => {
                  return (
                    <PrimaryButton
                      key={bindex}
                      type="outline"
                      buttonTitleStyle={styles.buttonTitleStyle(fontSize)}
                      iconName={bitem.iconName}
                      iconSize={15}
                      buttonStyle={styles.buttonStyle}
                      title={bitem.title}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
}

const styles = ScaledSheet.create({
  conatiner: {
    minHeight: '90@ms',

    flexDirection: 'row',
    //backgroundColor: 'orange',
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor: 'green',
  },
  buttonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  buttonStyle: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '26@ms',
    width: '83@ms',
    borderRadius: '50@ms',
    marginRight: '12@ms',
    backgroundColor: 'white',
  },
  buttonTitleStyle: fontSize =>
    ScaledSheet.create({
      fontSize: fontSize.h4,
      marginRight: '3@ms',
      marginLeft: '3@ms',
    }),
  desgnation: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      color: colors.black,
    }),
  detailSection: {
    flex: 1,
    //backgroundColor: 'red',
  },
  infoContainer: {
    paddingTop: '5@ms',
    //backgroundColor: 'pink',
  },
  name: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontFamily: fontFamily.bold,
      fontSize: fontSize.h3,
      color: colors.black,
    }),
  thumbnailSection: {
    padding: '10@ms',
    paddingTop: '5@ms',
    //
  },
});
