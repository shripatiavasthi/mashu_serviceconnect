import React, {useEffect} from 'react';
import {View} from 'react-native';
import MainCard from '../../shared/MainCard';
import {ScaledSheet} from 'react-native-size-matters';
import {getWhatYouNeed} from './store/dispatchers';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../shared/Loader';
import ErrorDetail from '../../shared/ErrorDetail';
import DynamicText from '../../shared/DynamicText';
import {useTheme} from 'react-native-elements';
import MainPage from '../../shared/MainPage';

export default function WhatYouNeed({navigation, route, ...props}) {
  const dispatch = useDispatch();
  const {colors, fontSize, fontFamily} = useTheme().theme;

  useEffect(() => onRefresh(), []);

  const onRefresh = () => dispatch(getWhatYouNeed());

  let data = useSelector(({whatYouNeed}) => whatYouNeed.whatYouNeed);
  let whatYouNeedFetchInProgress = useSelector(
    ({whatYouNeed}) => whatYouNeed.whatYouNeedFetchInProgress,
  );
  let whatYouNeedFetchError = useSelector(
    ({whatYouNeed}) => whatYouNeed.whatYouNeedFetchError,
  );

  return (
    <>
      {whatYouNeedFetchInProgress ? (
        <Loader />
      ) : !whatYouNeedFetchError && data ? (
        <>
          <View style={styles.overViewContainer}>
            <DynamicText
              text={data.overview}
              textType={data.textType.overview}
              style={styles.overViewText(colors, fontSize, fontFamily)}
            />
          </View>
          <MainPage
            onRefresh={onRefresh}
            data={data.services}
            keyExtractor={item => item.serviceId}
            renderItem={({item}) => (
              <View style={styles.cardsContainer}>
                <MainCard
                  onPress={() => navigation.navigate('WhatYouNeedServiceDataScreen', item)}
                  showNavigationOnRightSide={true}
                  title={item.title}
                  titleTextType={data.textType['services.title']}
                  description={item.description}
                  descriptionTextType={data.textType['services.description']}              
                  iconName={item.iconName}
                  iconUrl={item.iconUrl}
                  cardSkeleton={styles.cardSkeleton}
                  titleStyle={styles.titleStyle}
                />
              </View>
            )}
          />
        </>
      ) : (
        <ErrorDetail />
      )}
    </>
  );
}
const styles = ScaledSheet.create({
  overViewContainer: {padding: '20@ms', paddingBottom: '10@ms'},
  overViewText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      color: colors.black,
      fontSize: fontSize.h3,
      fontFamily: fontFamily.regular,
      lineHeight: '20@ms',
    }),
  cardsContainer: {paddingHorizontal: '10@ms'},
  titleStyle: {paddingBottom: '0@ms'},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  cardSkeleton: {height: '140@ms'},
});
