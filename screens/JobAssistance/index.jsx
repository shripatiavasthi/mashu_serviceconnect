import React, {useEffect} from 'react';
import {View} from 'react-native';
import MainCard from '../../shared/MainCard';
import {ScaledSheet} from 'react-native-size-matters';
import {getJobAssistance} from './store/dispatchers';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../shared/Loader';
import ErrorDetail from '../../shared/ErrorDetail';
import MainPage from '../../shared/MainPage';

export default function WhatYouNeed({navigation, route, ...props}) {
  const dispatch = useDispatch();

  useEffect(() => onRefresh(), []);

  const onRefresh = () => dispatch(getJobAssistance());

  let data = useSelector(({jobAssistance}) => jobAssistance.jobAssistance);
  let jobAssistanceFetchInProgress = useSelector(
    ({jobAssistance}) => jobAssistance.jobAssistanceFetchInProgress,
  );
  let jobAssistanceFetchError = useSelector(
    ({jobAssistance}) => jobAssistance.jobAssistanceFetchError,
  );

  return (
    <>
      {jobAssistanceFetchInProgress ? (
        <Loader />
      ) : !jobAssistanceFetchError && data ? (
        <MainPage
          onRefresh={onRefresh}
          data={data.services}
          keyExtractor={item => item.serviceId}
          renderItem={({item}) => (
            <View style={styles.cardsContainer}>
              <MainCard
                onPress={() => navigation.navigate('JobAssistanceServiceDataScreen', item)}
                name={item.name}
                showNavigationOnRightSide={true}
                title={item.title}
                titleTextType={data.textType['services.title']}
                description={item.description}
                descriptionTextType={data.textType['services.desription']}
                iconName={item.iconName}
                iconUrl={item.iconUrl}
                cardSkeleton={styles.cardSkeleton}
                titleStyle={styles.titleStyle}
              />
            </View>
          )}
        />
      ) : (
        <ErrorDetail />
      )}
    </>
  );
}
const styles = ScaledSheet.create({
  cardsContainer: {paddingHorizontal: '10@ms'},
  titleStyle: {paddingBottom: '0@ms'},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  cardSkeleton: {height: '140@ms'},
});
