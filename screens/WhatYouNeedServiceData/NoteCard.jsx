import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import DynamicText from '../../shared/DynamicText';

export default function NoteCard({note, textType}) {
  const {colors, fontFamily, fontSize} = useTheme().theme;

  if (note) {
    return (
      <View style={styles.overViewContainer(colors)}>
        <DynamicText
          text={note.title}
          textType={textType['note.title']}
          style={styles.title(colors, fontFamily, fontSize)}
        />
        <DynamicText
          text={note.description}
          textType={textType['note.description']}
          style={styles.description(colors)}
        />
      </View>
    );
  }
  return null;
}

const styles = ScaledSheet.create({
  overViewContainer: colors =>
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
  description: (colors) =>
    ScaledSheet.create({
      color: colors.white,
    }),
});
