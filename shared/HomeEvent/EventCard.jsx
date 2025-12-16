import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import DynamicText from '../DynamicText';
import MainCard from '../MainCard';
import EventDate from './EventDate';

export default function EventCard({item, detail, navigation}) {
  const onEventClick = () =>
    navigation.navigate('eventDetailed', {
      id: item.id,
      headerName: 'eventDetails',
    });

  return (
    <View style={styles.cardsContainer}>
      <MainCard
        showNavigationOnRightSide={!detail}
        name={item.title}
        title={{text: item.title}}
        description={{text: item.description}}
        descriptionNumberOfLines={detail ? null : 2}
        descriptionStyle={styles.description}
        leftContainerStyle={styles.leftContainerStyle}
        cardSkeleton={styles.cardSkeleton}
        onPress={detail ? null : onEventClick}
        TitleComponent={() => (
          <View style={styles.detailsContainer}>
            <EventDate
              event={item}
              textStyle={[styles.text, styles.dateStyle(detail)]}
            />

            {item.address ? (
              <DynamicText
                text={item.address.address}
                style={[styles.text, styles.address]}
              />
            ) : null}

            <DynamicText
              numberOfLines={1}
              style={[styles.text, styles.event]}
              text={
                item.eventOption === 'virtual'
                  ? 'Virtual Event'
                  : item.eventOption === 'hybrid'
                  ? 'Hybrid Event'
                  : ''
              }
            />
          </View>
        )}></MainCard>
    </View>
  );
}

const styles = ScaledSheet.create({
  cardsContainer: {paddingHorizontal: '10@ms'},
  detailsContainer: {paddingHorizontal: '8@ms'},
  cardSkeleton: {minHeight: '65@ms'},
  leftContainerStyle: {justifyContent: 'center'},
  boxContent: {
    flex: 1,
  },
  text: {
    color: '#ffffff',
    //fontFamily: 'Lato',
  },
  description: {
    color: 'black',
    fontSize: '14@ms',    
  },
  title: {
    fontSize: '17@ms',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  event: {
    marginTop: '3@ms',
    fontSize: '14@ms',
    color: '#000000',
    //fontFamily: 'Roboto',
    opacity: 0.74,
  },
  address: {
    marginTop: '6@ms',
    fontSize: '14@ms',
    color: '#000000',
    fontWeight: 'bold',    
    opacity: 0.74,
  },
  dateStyle: detail =>
    ScaledSheet.create({
      fontSize: detail ? '14@ms' : '12@ms',
      marginTop: '4@ms',
      color: '#000000',
      fontWeight: 'bold',      
      opacity: 0.74,
    }),
  addressText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      fontSize: fontSize.h3,
      color: colors.black,
      fontFamily: fontFamily.regular,
    }),
});
