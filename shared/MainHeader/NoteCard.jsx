import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import DynamicText from '../DynamicText';

export default function NoteCard({note, textType}) {
  if (!note) return null;

  const {colors, fontFamily, fontSize} = useTheme().theme;
  return (
    <View style={styles.noteContainer(colors)}>
      <DynamicText
        textType={textType}
        textTypeLabel="note.title"
        text={note.title}        
        style={styles.title(colors, fontFamily, fontSize)}
      />
      <DynamicText
        textType={textType}
        textTypeLabel="note.description"
        text={note.description}          
        style={styles.description(colors)}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  noteContainer: colors =>
    ScaledSheet.create({
      paddingTop: '9@ms',
      paddingLeft: '21@ms',
      paddingRight: '20@ms',
      paddingBottom: '19@ms',
      backgroundColor: colors.secondary,
    }),
  title: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.white,
      fontFamily: fontFamily.bold,
      textTransform: 'uppercase',
    }),
  description: colors =>
    ScaledSheet.create({
      color: colors.white,
    }),
});
