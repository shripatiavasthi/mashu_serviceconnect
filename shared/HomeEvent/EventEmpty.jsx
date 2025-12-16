import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import MainCard from '../MainCard';


export default function EventEmpty() {
  return (
    <View style={styles.cardsContainer}>
      <MainCard        
        name={"empty"}               
        cardSkeleton={styles.cardSkeleton}        
        ></MainCard>
      
    </View>
  );
}

const styles = ScaledSheet.create({
  cardsContainer: {paddingHorizontal: '10@ms'},  
  cardSkeleton: {minHeight: '80@ms'},
});
