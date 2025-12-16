import * as React from 'react';
import { Text, View, Pressable, Platform, Linking, TouchableHighlight } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import DynamicText from '../DynamicText';

export default function BusinessContactCard({ contact, labels }) {
  const { colors, fontSize, fontFamily } = useTheme().theme;

  return (
    <View style={styles.container}>
      <View>
        <DynamicText
          text={contact.title}
          style={styles.headingText(colors, fontSize, fontFamily)}
        />
      </View>

      <View style={styles.phoneFaxSection}>
        {contact.phone ? (
          <View style={styles.phoneContainer} >
            <DynamicText
              text={labels.phone}
              style={styles.addressText(colors, fontSize, fontFamily)}
            />
            <Pressable onPress={() => {
              Linking.openURL(
                Platform.OS === 'android'
                  ? 'tel:${' + contact.phone + '}'
                  : 'telprompt:${' + contact.phone + '}',
              )
            }}>{({ pressed }) => (
              <Text style={styles.phone(colors, fontSize, fontFamily, pressed)}>{contact.phone}</Text>
            )
              }
            </Pressable>
          </View>
        ): null}
        {contact.fax ? (
          <View style={styles.faxContainer}>
            <DynamicText
              text={labels.fax}
              style={styles.addressText(colors, fontSize, fontFamily)}
            />
            <Text style={styles.fax(colors, fontSize, fontFamily)}>{contact.fax}</Text>
          </View>
        ): null}
      </View>

      {contact.address ? <View>
        <DynamicText
          text={contact.address.address}
          style={styles.addressText(colors, fontSize, fontFamily)}
        />
      </View>: null}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    //margin: '10@ms',
    padding: '5@ms',
    paddingBottom: '5@ms',
    paddingHorizontal: '16@ms',
    //backgroundColor: 'pink',
    //borderRadius: '10@ms',
  },
  phoneFaxSection: {
    flex: 1,
    paddingTop: '5@ms',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingEnd: '50@ms',
    width: '87%',
    //backgroundColor: 'red',
    // justifyContent: 'space-between',
  },

  headingText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3odd,
      color: colors.black,
      fontFamily: fontFamily.bold,
    }),

  phoneContainer: {
    flexDirection: 'row',
    marginRight: '10@ms'
  },
  faxContainer: {
    flexDirection: 'row',
    // paddingRight: '50@ms',
  },
  addressText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.black,
      fontFamily: fontFamily.regular,
    }),
  phone: (colors, fontSize, fontFamily, pressed) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      fontFamily: fontFamily.bold,
      paddingLeft: '5@ms',
      color: pressed ? colors.textBlue : colors.primary,
    }),
  fax: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.black,
      fontFamily: fontFamily.bold,
      paddingLeft: '5@ms',
    }),
});
