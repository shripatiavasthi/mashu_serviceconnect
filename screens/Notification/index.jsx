import React from 'react';
import MainPageWrapper from '../../shared/MainPage/wrapper';
import NotificationCard from './NotificationCard';
import { getNotifications } from './store/dispatchers';
import * as selectors from './store/selectors';
import { useSelector } from 'react-redux';

export default function Notification({navigation, route, ...props}) {
  const loader = pageId => getNotifications(pageId);

  const _renderItem = ({item}) => (
    <NotificationCard data={item} navigation={navigation} />
  );

  let settingsData = useSelector(({ settings }) => settings.settingsData);

  return (
    <MainPageWrapper
      pageName={route.params.name}
      pageTitle={settingsData?.header.labels.notification}
      loader={loader}
      selectors={selectors}
      renderItem={_renderItem}
      keyExtractor={item => item.id}
      listSelector={data => data?.list}
    />
  );
}
