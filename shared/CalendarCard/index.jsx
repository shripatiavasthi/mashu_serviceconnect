import * as React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import CustomLink from '../CustomLink';

export default function CalendarCard({contact}) {
  const {colors, fontSize, fontFamily} = useTheme().theme;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>25</Text>
            <Text style={styles.month}>Oct</Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Text style={styles.title(colors, fontSize, fontFamily)}>
            Appointment
          </Text>

          <Text style={styles.description(colors, fontSize, fontFamily)}>
            Lorem Ipsum is simply dummy text of the printing.
          </Text>
          
        </View>
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    height: '130@ms',
    //padding: '10@ms',
    flexDirection: 'row',
    //backgroundColor: 'pink',
  },
  date: {
    fontSize: '25@ms',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#036CB6',
  },
  month: {
    fontSize: '21@ms',
    fontFamily: 'Arial',
    color: '#036CB6',
    top: '-5@ms',
  },
  dateContainer: {
    width: '65@ms',
    height: '62@ms',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FBFE',
    borderRadius: '10@ms',
    top: '10@ms',
  },

  rightContainer: {flex: 1, padding: '9@ms'},

  title: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      color: colors.primary,
      fontFamily: fontFamily.bold,
    }),

  description: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.black,
      fontFamily: fontFamily.regualr,
    }),
  leftSection: {
    flex: 0.3,
    paddingLeft: '12@ms',
    alignItems: 'center',
  },
  linksContainer: index => ({
    paddingTop: index == 0 ? 7 : 5,
  }),
});
