import React, { useEffect } from 'react';
import { View } from 'react-native';
import queryString from 'query-string';
import { ScaledSheet } from 'react-native-size-matters';
import DynamicText from '../../shared/DynamicText';
import MainCard from '../../shared/MainCard';
import { useTheme } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailedNotification } from './store/dispatchers';
import { getUnreadNotificationCount } from '../Home/store/dispatchers';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';
import * as crashlytics from '../../utils/Crashlytics';


import MainPage from '../../shared/MainPage';
import Api from '../../utils/Api';
import { formatDateTime } from '../../utils/FormatDateTime';

const NotificationDetailed = ({ navigation, route }) => {
  const id = route.params.id
  const dispatch = useDispatch();

  const token = useSelector(({ settings }) => settings.token);

  useEffect(() => {
    onRefresh();
    Api.post(
      `/notifications/${id}/read`,
      queryString.stringify({
        "deviceToken": token
      }),
    );
  }, [id]);


  const onRefresh = () => {
    dispatch(getDetailedNotification(id));

  };

  let data = useSelector(({ detailedNotification }) => detailedNotification.detailNotifData);
  let fetchInProgress = useSelector(({ detailedNotification }) => detailedNotification.detailNotifDataFetchInProgress);
  let fetchError = useSelector(({ detailedNotification }) => detailedNotification.detailNotifDataFetchError);

  useEffect(() => {     
    if(data) {
      crashlytics.log("notification data - " + JSON.stringify(data));
    }
  }, [data])

  const { colors, fontSize, fontFamily } = useTheme().theme;
  // useEffect(() => { sendAnalytics(events.notification_opened, props.title.en); }, [data.title])
  const _renderHeader = () => {
    if (!data) return null;
    return (
      <View style={styles.cardsContainer}>
        <MainCard
          cardSkeleton={styles.cardSkeleton}
          titleStyle={styles.titleStyle}
          titleTextStyle={styles.titleTextStyle(fontSize)}
          title={{ text: data.title }}>
          <View style={styles.detailsContainer}>
            <DynamicText
              style={styles.date(data.isNew, colors, fontFamily, fontSize)}
              text={formatDateTime(data.sentOn).format('MMM DD, YYYY. hh:mma')}
            />
            <View style={styles.description}>
              <DynamicText
                text={data.description}
                textType={{ description: 'html' }}
                textTypeLabel="description"
              />
            </View>
          </View>
        </MainCard>
      </View>
    );
  };

  return (
    <MainPage
      pageName={'NotificationDetail'}
      onRefresh={onRefresh}
      header={_renderHeader}
      data={data}
      loading={fetchInProgress}
      error={fetchError}
    />
  );
};

const styles = ScaledSheet.create({
  title: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h1,
      color: colors.primary,
      fontFamily: fontFamily.bold,
      lineHeight: '22@ms',
    }),
  date: (isNew, colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.black,
      fontFamily: fontFamily.bold,
      marginBottom: '12@ms'
    }),
  description: {
    marginBottom: '20@ms',
  },
  cardsContainer: { padding: '20@ms' },
  detailsContainer: { paddingHorizontal: '18@ms' },
  cardSkeleton: { minHeight: '65@ms' },
  titleStyle: { paddingBottom: '0@ms' },
  titleTextStyle: fontSize =>
    ScaledSheet.create({ paddingBottom: '0@ms', lineHeight: '26@ms', fontSize: fontSize.h1 }),
});

export default NotificationDetailed

/*
from api - 
channelId: "fcm_fallback_notification_channel"
color: null
data: {id: '120'}
finish: ƒ finish()
foreground: true
id: "629926555"
priority: "high"
smallIcon: "ic_notification"
sound: null
tag: null
title: "data check"
userInteraction: false
visibility: "private"


from tray (foreground)- 
data:
id: "120"
[[Prototype]]: Object
finish: ƒ finish()
foreground: true
id: "460119908"
message: "data check\n"
title: "data check"
message: "data check\n"
userInteraction: true

from tray (background) - 
data:
collapse_key: "com.serviceconnect"
from: "900056419228"
google.delivered_priority: "normal"
google.message_id: "0:1649883283626764%8a94f0a28a94f0a2"
google.original_priority: "normal"
google.sent_time: 1649883283610
google.ttl: 2419200
id: "121"
[[Prototype]]: Object
finish: ƒ finish()
foreground: false
userInteraction: true

detail - 

createdOn: 1649883282164
description:
en: "<!DOCTYPE HTML>\n                            <html>\n                            <head>\n                            <meta charset=\"UTF-8\"> \n                            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t\t\t\t\t\t\t<link href=\"https://fonts.googleapis.com/css?family=roboto:400,500,700\" rel=\"stylesheet\">\n\t\t\t\t\t\t\t<style>\n                            body {\n                            margin: 0;\n                            padding: 0;\n                            color: #292929;\n                            font-family: roboto;\n                            font-size: 1rem;\n                            }\n                            p {\n                            margin: 0;\n                            padding: 0;\n                            }\n                            </style>\n                            </head>\n                            <body>\n                            <p style=\"font-family: 'Arial', sans-serif; color: #939ba4; font-size 0.875rem; word-wrap: break-word; line-height: 22px;\">data check</p>\n\n                            </body>\n                            \n                            </html>"
[[Prototype]]: Object
id: 121
interval: 1000
notificationFor: "all"
plainDescription: {en: 'data check\n'}
processedOn: 1649883282164
sentOn: 1649883283537
status: "sent"
title: {en: 'data check'}


*/
