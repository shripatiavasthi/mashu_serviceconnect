import React, {useEffect} from 'react';
import {View} from 'react-native';
import MainCard from '../../shared/MainCard';
import {ScaledSheet} from 'react-native-size-matters';
import {getEmergencyHelp} from './store/dispatchers';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../shared/Loader';
import ErrorDetail from '../../shared/ErrorDetail';
import DynamicText from '../../shared/DynamicText';
import {useTheme} from 'react-native-elements';
import MainPage from '../../shared/MainPage';

export default function EmergencyHelp({navigation, route, ...props}) {
  const dispatch = useDispatch();
  const {colors, fontSize, fontFamily} = useTheme().theme;

  useEffect(() => onRefresh(), []);

  const onRefresh = () => dispatch(getEmergencyHelp());

  let data = useSelector(({emergencyHelp}) => emergencyHelp.emergencyHelp);
  let emergencyHelpFetchInProgress = useSelector(
    ({emergencyHelp}) => emergencyHelp.emergencyHelpFetchInProgress,
  );
  let emergencyHelpFetchError = useSelector(
    ({emergencyHelp}) => emergencyHelp.emergencyHelpFetchError,
  );

  return (
    <>
      {emergencyHelpFetchInProgress ? (
        <Loader />
      ) : !emergencyHelpFetchError && data ? (
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
                  onPress={() =>
                    navigation.navigate('EmergencyHelpServiceDataScreen', item)
                  }
                  showNavigationOnRightSide={true}
                  title={item.title}
                  titleTextType={data.textType['services.title']}
                  description={item.description}
                  descriptionTextType={data.textType['services.description']}
                  // name={item.name}
                  // navigation={navigation}
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
