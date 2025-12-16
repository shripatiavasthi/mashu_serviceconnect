import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';

const HexColorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g

export default function RichText({ text, style }) {
  const navigation = useNavigation();
  const { fontFamily } = useTheme().theme;
  const htmlStyles = StyleSheet.create({
    p: {
      paddingTop: 0,
      marginTop: 3,
      marginBottom: 2,
      color: style?.color || '#000000',
      fontFamily: fontFamily.regular,
    },
    body: { color: style?.color, fontFamily: fontFamily.regular },
    a: { color: '#036CB6', fontWeight: 'bold', fontFamily: fontFamily.regular },
  });
  if (text == null || text == '') return null;
  let formattedText = text.replace(HexColorRegex, "'$1'")  //add '' in all hex values
  
  return (
    <HTMLView
      value={formattedText}
      stylesheet={htmlStyles}
      onLinkPress={(url) => Linking.openURL(url)}
    />
  );
}
