import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import CustomIcon from '../CustomIcon';
import DynamicText from '../DynamicText';

export default function HomeContentTitle({
  textStyle,  
  showViewAll = true,  
  navigation
}) {
  let settingsData = useSelector(({ settings }) => settings.settingsData);
  if (!settingsData) return null;    

  const onViewAll = () =>
  navigation.navigate('events', {
    name: 'events',
    headerName: 'events',
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomIcon iconName={'EventScheduleIcon'} width={32} height={32} />
        <DynamicText text={settingsData?.header.labels.events} style={[styles.text, textStyle]} />
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={styles.viewAllTextContainer}
          onPress={onViewAll}>
          {showViewAll ? (
            <DynamicText text={settingsData?.header.labels.viewall} style={styles.viewAllText} />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {   
    paddingBottom: '5@ms',
    flexDirection: 'row',        
    paddingHorizontal: '10@ms',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '20@ms',
    width: '100%',
  },
  verticalBar: {
    backgroundColor: '#006bb1',
    width: '5@ms',
    borderRadius: '8@ms',
  },
  text: {
    //fontFamily: 'Roboto',
    fontSize: '18@ms',
    textTransform: 'uppercase',
    marginLeft: '9@ms',
    color: '#036CB6',
    fontWeight: 'bold',
  },
  viewAllTextContainer: {
    paddingVertical: '12@ms',
    paddingLeft: '18@ms',
    paddingRight: '8@ms',
    alignItems: 'center'
  },
  viewAllText: {
    fontSize: '12@ms',
    color: '#5A5A5A',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: '2%',
    marginRight: '2%',
  },
});
