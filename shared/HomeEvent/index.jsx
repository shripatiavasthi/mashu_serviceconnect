import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../screens/Home/store/dispatchers';
import EventListHeader from './EventListHeader';
import EventListing from './EventListing';

export default function HomeEvent({navigation}) {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const loadEvents = async () => {
      await dispatch(getEvents());
    };
    loadEvents();
  }, [dispatch]);
  
  let eventsData = useSelector(({home}) => home.eventsData);


  if (eventsData?.list?.length > 0) {
    return (
      <View style={styles.container}>
        <EventListHeader navigation={navigation} />
        <EventListing
          events={eventsData?.list.splice(0, 3)}
          navigation={navigation}
        />
      </View>
    );
  }
  return null;
}

const styles = ScaledSheet.create({
  container: {paddingVertical: '26@ms'},
});
