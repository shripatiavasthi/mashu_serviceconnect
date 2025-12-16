import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import DynamicText from '../../shared/DynamicText';
import ErrorDetail from '../../shared/ErrorDetail';
import Loader from '../../shared/Loader';
import MainCard from '../../shared/MainCard';
import DataCard from './DataCard';
import { getJobAssistanceServiceData } from './store/dispatchers';

function ServiceDataPageComponent({ data, navigation }) {
  const { labels, textType, overview, list } = data;
  const { colors, fontSize, fontFamily } = useTheme().theme;
  return (
    <View style={styles.cardsContainer}>
      {overview && (
        <View style={styles.overViewContainer}>
          <DynamicText
            textType={textType['overview']}
            text={overview}
            style={styles.overViewText(colors, fontFamily, fontSize)}
          />
        </View>
      )}
      {list && list.map((item) => (
        <View style={styles.cardsContainer} key={item.id}>
          <MainCard
            description={item.description}
            title={item.title}
            titleTextType={data.textType['list.title']}
            description={item.description}
            descriptionTextType={data.textType['list.description']}>
            <DataCard navigate={navigation.navigate} data={item} labels={labels} />
          </MainCard>
        </View>
      ))}
    </View>
  );
}

export default function ServiceData({ navigation, route, ...props }) {
  const { name } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobAssistanceServiceData(name));
  }, []);

  let data = useSelector(({ jobAssistanceServiceData }) => {
    return jobAssistanceServiceData.jobAssistanceServiceData;
  });

  let jobAssistanceServiceDataFetchInProgress = useSelector(
    ({ jobAssistanceServiceData }) =>
      jobAssistanceServiceData.jobAssistanceServiceDataFetchInProgress,
  );
  let jobAssistanceServiceDataFetchError = useSelector(
    ({ jobAssistanceServiceData }) =>
      jobAssistanceServiceData.jobAssistanceServiceDataFetchError,
  );

  return (
    <>
      {jobAssistanceServiceDataFetchInProgress ? (
        <Loader />
      ) : !jobAssistanceServiceDataFetchError && data ? (
        <ScrollView style={styles.pageContainer}>
          <ServiceDataPageComponent data={data} navigation={navigation} />
        </ScrollView>
      ) : (
        <ErrorDetail />
      )}
    </>
  );
}
const styles = ScaledSheet.create({
  pageContainer: { flex: 1 },
  cardsContainer: { paddingHorizontal: '10@ms' },
  overViewContainer: { padding: '20@ms', paddingBottom: '10@ms' },
  overViewText: (colors, fontSize, fontFamily) =>
    ScaledSheet.create({
      color: colors.black,
      fontSize: fontSize.h3,
      fontFamily: fontFamily.regular,
      lineHeight: '20@ms',
    }),
  cardSkeleton: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    elevation: 0,
    overflow: 'hidden',
    margin: 0,
  },
});
