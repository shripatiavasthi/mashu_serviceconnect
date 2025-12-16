import React from 'react';
import { TouchableHighlight, View, Linking } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useTheme } from 'react-native-elements';
import CustomIcon from '../CustomIcon';
import DynamicText from '../DynamicText';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';


export default function Link({ title, iconUrl, data, navigation, screenName }) {
  if (!data) return;
  const { colors, fontFamily, fontSize } = useTheme().theme;
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableHighlight
        underlayColor="#ebedf0"
        onPress={() => {
          if (screenName) {
            navigation.navigate(screenName, {
              title: title,
              iconUrl: iconUrl,
              uri: data.link,
            });
          } else {
            sendAnalytics(events.link_clicked, data.link);
            Linking.openURL(data.link);
          }
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {data.iconUrl ? (
            <CustomIcon height={15} width={15} iconUrl={data.iconUrl} />
          ) : null}

          <DynamicText
            style={styles.description(colors, fontFamily, fontSize, data)}
            text={data.linkDescription}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = ScaledSheet.create({
  description: (colors, fontFamily, fontSize, data) =>
    ScaledSheet.create({
      fontSize: fontSize.h3odd,
      // /paddingTop: 0,
      paddingLeft: data && data.iconUrl ? '5@ms' : 0,
      color: colors.secondary,
      fontFamily: fontFamily.regular,
      textDecorationLine: 'underline',
    }),
});
