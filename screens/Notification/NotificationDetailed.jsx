import React from 'react'
import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import DynamicText from '../../shared/DynamicText';
import MainCard from '../../shared/MainCard'
import { useTheme } from 'react-native-elements';
import * as crashlytics from '../../utils/Crashlytics';




const NotificationDetailed = ({ navigation, route }) => {
  crashlytics.log("NotificationDetailed route data " + JSON.stringify(route));
  const { colors, fontSize, fontFamily } = useTheme().theme;
  const { title, date, content } = route.params.data;
  return (
    <View>
      <MainCard cardSkeleton={styles.cardSkeleton}  >

        <DynamicText text={title} style={styles.title(colors, fontFamily, fontSize)} />
        <Text style={styles.date(colors, fontFamily, fontSize)}>{date}</Text>
        <DynamicText text={content} style={styles.content} />
      </MainCard>
    </View>
  )
}
const styles = ScaledSheet.create({
  title: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      top: '4@ms',
      color: colors.primary,
      fontFamily: fontFamily.bold,
    }),
  date: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      top: '4@ms',
      color: colors.black,
      marginVertical: '10@ms',
      fontFamily: fontFamily.bold,
    }),
  content: {
    lineHeight: 20,
    marginVertical: '10@ms'
  },
  cardSkeleton: {
    margin: '20@ms',
    padding: '10@ms',
  }
})

export default NotificationDetailed
