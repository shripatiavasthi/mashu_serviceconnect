import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useTheme} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DynamicText from '../../shared/DynamicText';
import {readListSelector} from './store/selectors';
import {useSelector} from 'react-redux';
import {formatDateTime} from '../../utils/FormatDateTime';

const NotificationCard = ({data, navigation}) => {
  const {colors, fontFamily, fontSize} = useTheme().theme;

  let isRead = useSelector(readListSelector(data.id));

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('notificationDetailed', {
          id: data.id,
          headerName: 'notification',
        })
      }>
      <View style={styles.notificationCard(isRead)}>
        <View style={styles.titleContainer}>
          <DynamicText
            numberOfLines={2}
            style={styles.title(isRead, colors, fontFamily, fontSize)}
            text={data.title}
          />
        </View>
        <DynamicText
          style={styles.date(isRead, colors, fontFamily, fontSize)}
          text={formatDateTime(data.sentOn).format('MMM DD, YYYY. hh:mma')}
        />
        <DynamicText
          text={data.plainDescription}
          numberOfLines={2}
          style={styles.content(colors, fontSize)}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  notificationCard: read =>
    ScaledSheet.create({
      padding: 10,
      backgroundColor: '#F8FBFE',
      borderColor: '#E4F1FE',
      borderWidth: 1,
    }),
  title: (read, colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      top: '4@ms',
      color: colors.primary,
      fontFamily: read ? fontFamily.normal : fontFamily.bold,
      width: '260@ms',
      lineHeight: '22@ms',
    }),
  date: (read, colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.black,
      marginVertical: '12@ms',
      fontFamily: read ? fontFamily.normal : fontFamily.bold,
    }),
  content: (colors, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.grey,
      lineHeight: 23,
    }),
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: '10@ms',
  },
});

export default NotificationCard;
