import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {
  setActiveDrawer,
  setLocation,
  showToast,
} from '../../settings/store/dispatchers';
import NotificationManager from '../../settings/NotificationManager';
import HomeBanner from '../../shared/HomeBanner';
import HomeEvent from '../../shared/HomeEvent';
import MainCard from '../../shared/MainCard';
import MainPage from '../../shared/MainPage';
import { getServices } from './store/dispatchers';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import constants from '../../constants';
import { sendScreenView } from '../../utils/firebaseAnalytics';
import * as crashlytics from '../../utils/Crashlytics';


export default function Home({ navigation, ...props }) {
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
    getLocation();
    sendScreenView('Home');
  }, []);

  const getLocation = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ).then(result => {
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          ({ coords }) => {
            const { longitude, latitude } = coords;
            const location = { longitude, latitude };
            dispatch(setLocation({ location }));
          },
          error => {
            const { code, message } = error;
            crashlytics.log(`${code}: ${message}`);
            dispatch(setLocation({}));
            dispatch(
              showToast({
                type: 'error',
                msg: constants.locationAccess,
                detail: message,
              }),
            );
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
        );
      } else {
        dispatch(setLocation({}));
        dispatch(
          showToast({
            type: 'error',
            msg: constants.locationAccess,
          }),
        );
      }
    });
  };

  const onRefresh = () => dispatch(getServices());

  useFocusEffect(() => {
    dispatch(setActiveDrawer({ drawer: 'home' }));
  });

  let data = useSelector(({ home }) => home.servicesData);
  let fetchInProgress = useSelector(({ home }) => home.servicesFetchInProgress);
  let fetchError = useSelector(({ home }) => home.servicesFetchError);

  const _renderItem = ({ item }) => (
    <View style={styles.cardsContainer}>
      <MainCard
        showNavigationOnRightSide={true}
        name={item.name}
        textType={data.textType}
        title={{ text: item.title, textTypeLabel: 'services.title' }}
        description={{
          text: item.description,
          textTypeLabel: 'services.description',
        }}
        iconUrl={item.iconUrl}
        leftContainerStyle={styles.leftContainerStyle}
        cardSkeleton={styles.cardSkeleton}
        onPress={() => navigation.push(item.screenType || item.name, item)}
        serviceId={item.serviceId}></MainCard>
    </View>
  );

  const _renderHeader = () => <HomeBanner navigation={navigation} />;

  const _renderFooter = () => <HomeEvent navigation={navigation} />

  return (
    <>
      <NotificationManager navigation={navigation} />
      <MainPage
        pageName={'Home'}
        onRefresh={onRefresh}
        header={_renderHeader}
        footer={_renderFooter}
        data={data}
        list={data?.services}
        renderItem={_renderItem}
        loading={fetchInProgress}
        error={fetchError}
      />
    </>
  );
}
const styles = ScaledSheet.create({
  cardsContainer: { paddingHorizontal: '10@ms' },
  cardSkeleton: { minHeight: '65@ms' },
  leftContainerStyle: { justifyContent: 'center' },
});
