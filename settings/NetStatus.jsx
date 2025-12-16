import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetStatus} from './store/dispatchers';
import CustomIcon from '../shared/CustomIcon';

const offlineColor = '#353536';

const NetInfoView = props => {
  const dispatch = useDispatch();

  let isConnected = useSelector(({settings}) => settings.isConnected);


  let connected = isConnected
  useEffect(() => {
    let unsubscribe = NetInfo.addEventListener(state => {
      let isReallyConnectedNow = state.isConnected && state.isInternetReachable;
      if (isReallyConnectedNow != connected) {
        connected = isReallyConnectedNow
        dispatch(setNetStatus({isConnected: connected}));
        // StatusBar.setBackgroundColor(connected ? '#036CB6' : offlineColor);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected ? null : (
    <View style={styles.container}>
      <View style={styles.netInfoContainer}>
        <CustomIcon iconName="Cloud" height={15} color="white" />
        <Text style={styles.netInfoText}>You are offline</Text>
      </View>
      <Text note style={styles.netInfoNote}>
        Please check your internet connection
      </Text>
    </View>
  );
};

export default NetInfoView;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: offlineColor,
    paddingTop: '15@ms',
    paddingBottom: '8@ms',
    paddingLeft: '12@ms',
  },
  netInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netInfoText: {
    color: 'white',
    marginStart: 5,
    fontWeight: '500',
    fontSize: '14@ms',
  },
  netInfoNote: {
    color: 'white',
    margin: 5,
    fontSize: '10@ms',
  },
});
