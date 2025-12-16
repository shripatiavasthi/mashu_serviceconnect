import React, { useState } from 'react';
import { View, Platform, Linking } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import PrimaryButton from '../PrimaryButton';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../settings/store/dispatchers';
import LocationChecker from '../../screens/ServiceItems/LocationChecker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import constants from '../../constants';
import * as crashlytics from '../../utils/Crashlytics';
import { sendAnalytics, events } from '../../utils/firebaseAnalytics';



const openMap = (_frmCoord, _toCoord, title) => {
  sendAnalytics(events.opened_map, title.en)
  let url = `${Platform.OS === 'ios'
    ? `https://maps.apple.com/`
    : 'https://maps.google.com/'
    }?saddr=${_frmCoord.latitude},${_frmCoord.longitude}&daddr=${_toCoord.latitude
    },${_toCoord.longitude}&dirflg=d`;
  Linking.openURL(url);
};

export default function BtnStack(props) {
  const { item, colors, actionIcons, labels, navigation, itemName } = props;
  const dispatch = useDispatch();
  let location = useSelector(({ settings }) => settings.location);

  const handleVisit = (address, title) => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ).then(result => {
      if (result === RESULTS.GRANTED) {
        if (location) {
          openMap(location, address, title);
        } else {
          Geolocation.getCurrentPosition(
            ({ coords }) => {
              const { longitude, latitude } = coords;
              location = { longitude, latitude };
              dispatch(setLocation({ location }));
              openMap(location, address, title);
            },
            error => {
              const { code, message } = error;
              setLocationPopup(true);
              crashlytics.log(`${code}: ${message}`);
              dispatch(setLocation({}));
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
          );
        }
      } else if (result === RESULTS.DENIED) {
        dispatch(setLocation({}));
        // dispatch(
        //   showToast({
        //     type: 'error',
        //     msg: constants.locationAccessText            
        //   }),
        // ); 
      } else if (result === RESULTS.BLOCKED) {
        dispatch(setLocation({}));
        setLocationPopup(true);
      }
    });
  };

  const buttons = [];
  if (item.phoneNumber) {
    buttons.push({
      title: labels.actionButtons.call,
      iconUrl: actionIcons.phone,
      data: item.phoneNumber,
      action: () => {
        sendAnalytics(events.call, item.phoneNumber);
  
        const phoneUrlAndroid = `tel:${item.phoneNumber}`;
        const phoneUrlIosPrompt = `telprompt:${item.phoneNumber}`;
        const phoneUrlIosFallback = `tel:${item.phoneNumber}`;
        
   
        if (Platform.OS === 'ios') {
          // Check if telprompt is supported
          Linking.canOpenURL(phoneUrlIosPrompt)
            .then((supported) => {
              if (supported) {
                console.log('telprompt is supported');
              } else {
                console.log('telprompt is not supported, falling back to tel');
              }
  
              const phoneUrl = supported ? phoneUrlIosPrompt : phoneUrlIosFallback;
              return Linking.openURL(phoneUrl);
            })
            .catch(err => {
              console.error('Failed to make a call', err);
            });
        } else {
          // For Android, use tel scheme directly
          console.log('Using tel scheme for Android');
          Linking.openURL(phoneUrlAndroid)
            .catch(err => {
              console.error('Failed to make a call', err);
            });
        }
      },
    });
  }

  if (item.websiteUrl) {
    buttons.push({
      title: labels.actionButtons.website,
      iconUrl: actionIcons.website,
      data: item.websiteUrl,
      action: () => {
        sendAnalytics(events.link_clicked, item.websiteUrl)
        Linking.openURL(item.websiteUrl)
      },
    });
  }

  if (item.address) {
    buttons.push({
      title: labels.actionButtons.visit,
      iconUrl: actionIcons.visit,
      data: item.address.address,
      action: () =>
        handleVisit({
          latitude: item.address.lat,
          longitude: item.address.lng
        },
          labels.actionButtons.visit
        ),
    });
  }

  const [locationPopup, setLocationPopup] = useState(false);
  return (
    <>
      <LocationChecker
        visible={locationPopup}
        location={item.address}
        setVisible={setLocationPopup}
      />
      <View style={styles.buttonGroupContainer}>
        {buttons.map((bItem, bIndex) => {
          return (
            <PrimaryButton
              color={colors.white}
              iconUrl={bItem.iconUrl}
              iconWidth={19}
              onPress={bItem.action}
              key={bIndex}
              iconHeight={19}
              buttonContainerStyle={styles.buttonContainerStyle}
              buttonStyle={styles.buttonStyle}
              buttonTitleStyle={styles.titleStyle}
              title={bItem.title}
            />
          );
        })}
      </View>
    </>
  );
}
const styles = ScaledSheet.create({
  buttonGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '13@ms',
    marginTop: '25@ms',
    //backgroundColor: "red"
  },
  buttonContainer: {
    justifyContent: 'center',
    padding: '17@ms',
    paddingTop: 0,
  },
  buttonStyle: {
    height: '35@ms',
    width: '95@ms',
    backgroundColor: '#ED8C28',
    borderRadius: '50@ms',
  },
  buttonContainerStyle: {
    alignItems: 'space-around',
    borderRadius: '50@ms',
    //marginLeft: '8@ms',
  },
  titleStyle: {
    fontSize: '13@ms',
    marginRight: '3@ms',
    marginLeft: '3@ms',
  },
});
