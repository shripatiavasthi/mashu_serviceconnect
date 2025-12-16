import React from 'react';
import { useDispatch } from 'react-redux';
import MainPageWrapper from '../../shared/MainPage/wrapper';
import EventCard from '../../shared/HomeEvent/EventCard';
import { getEvents } from './store/dispatchers';
import * as selectors from './store/selectors';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  setActiveDrawer,  
} from '../../settings/store/dispatchers';

export default function Event({navigation, route, ...props}) {
  const loader = pageId => getEvents(pageId);

  const dispatch = useDispatch();

  useFocusEffect(() => {
    dispatch(setActiveDrawer({ drawer: 'events' }));
  });

  const _renderItem = ({item}) => (
    <EventCard item={item} navigation={navigation} key={item.id}/>
  );

  let settingsData = useSelector(({ settings }) => settings.settingsData);

  return (
    <MainPageWrapper
      pageName={route.params.name}
      pageTitle={settingsData?.header.labels.events}
      loader={loader}
      selectors={selectors}
      renderItem={_renderItem}
      keyExtractor={item => item.id}
      listSelector={data => data?.list}
    />
  );
}
