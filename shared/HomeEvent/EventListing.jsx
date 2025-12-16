import React from 'react';
import EventCard from './EventCard';
import EventEmpty from './EventEmpty';

export default function EventListing({events, navigation}) {
  return events ? events.map(item => <EventCard key={item.id} item={item} navigation={navigation} />) : <EventEmpty />;
}
