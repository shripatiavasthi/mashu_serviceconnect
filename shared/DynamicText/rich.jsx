import React from 'react';
import { useWindowDimensions, Linking } from 'react-native';
import { useTheme } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';

const HexColorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g

export default function RichText({ text, style }) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { fontFamily } = useTheme().theme;
  const systemFonts = [
    fontFamily.bold,
    fontFamily.regular,
    ...defaultSystemFonts,
  ];
  const tagsStyles = { p: { paddingTop: 0, marginTop: 3, marginBottom: 2, color: style?.color || '#000000' }, body: { color: style?.color }, a: { color: '#036CB6', fontWeight: "bold" }  };
  if (text == null || text == '') return null;
  let formattedText = text.replace(HexColorRegex, "'$1'")  //add '' in all hex values
  
  return (
    <RenderHtml
      tagsStyles={tagsStyles}
      contentWidth={width}
      source={{ html: formattedText }}
      systemFonts={systemFonts}
      renderersProps={{ a: { onPress: (evt, href) => { Linking.openURL(href) } } }}
    />
  );
}
