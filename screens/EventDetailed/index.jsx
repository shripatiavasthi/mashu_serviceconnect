import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../../shared/HomeEvent/EventCard';
import MainPage from '../../shared/MainPage';
import { getDetailedEvent } from './store/dispatchers';
import { useFocusEffect } from '@react-navigation/native';
import {
  setActiveDrawer,  
} from '../../settings/store/dispatchers';

const EventDetailed = ({ route }) => {
  const id = route.params.id
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();   
  }, [id]);

  useFocusEffect(() => {
    dispatch(setActiveDrawer({ drawer: 'events' }));
  });

  const onRefresh = () => {
    dispatch(getDetailedEvent(id));
  };

  let data = useSelector(({ detailedEvent }) => detailedEvent.detailEventData);
  let fetchInProgress = useSelector(({ detailedEvent }) => detailedEvent.detailEventDataFetchInProgress);
  let fetchError = useSelector(({ detailedEvent }) => detailedEvent.detailEventDataFetchError);
  
  const _renderHeader = () => {
    if (!data) return null;
    return <EventCard item={data} detail={true}/>   
  };

  return (
    <MainPage
      pageName={'EventDetailed'}
      onRefresh={onRefresh}
      header={_renderHeader}
      data={data}
      loading={fetchInProgress}
      error={fetchError}
    />
  );
};


export default EventDetailed

