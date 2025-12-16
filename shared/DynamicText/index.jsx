import React from 'react';
import {Text} from 'react-native';
import translation from '../../utils/Translation';
import RichText from './rich';

export default function DynamicText({
  text,
  textType,
  textTypeLabel,
  style,
  numberOfLines,
  children,
}) {
  if (!text) return null;
  const translatedText = typeof text === 'string' ? text : translation(text);
  return textType && textType[textTypeLabel] === 'html' ? (
    <RichText text={translatedText} style={style} />
  ) : (
    <Text style={style} numberOfLines={numberOfLines}>
      {translatedText}
      {children}
    </Text>
  );
}
