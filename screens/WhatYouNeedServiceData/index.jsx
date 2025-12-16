import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import DynamicText from '../../shared/DynamicText';
import ErrorDetail from '../../shared/ErrorDetail';
import GradientCardList from '../../shared/GradientCard/list';
import Loader from '../../shared/Loader';
import MainCard from '../../shared/MainCard';
import NoteCard from './NoteCard';
import { getWhatYouNeedServiceData } from './store/dispatchers';

function ServiceDataPageComponent({ data, navigation }) {
  const { actionIcons, labels, textType, note, sections } = data;
  const { colors, fontSize, fontFamily } = useTheme().theme;
  return (
    <>
      <NoteCard note={note} textType={textType} />
      {sections &&
        sections.map(section => {
          return (
            <View style={styles.cardsContainer} key={section.id}>
              <MainCard
                title={section.title}
                titleLine={5}
                titleTextType={textType['sections.title']}
                description={section.overview}
                descriptionTextType={textType['sections.overview']}
                iconUrl={section.iconUrl}
                titleStyle={styles.titleStyle}
                titleTextStyle={styles.titleTextStyle(fontSize)}
                leftContainerStyle={styles.leftContainerStyle}
                descriptionSectionStyle={styles.descriptionSectionStyle}
                cardSkeleton={styles.cardSkeleton}>
                {section.listTitle && (
                  <DynamicText
                    textType={textType['sections.listTitle']}
                    text={section.listTitle}
                    style={styles.listTitle(colors, fontFamily, fontSize)}
                  />
                )}
                {section.list && (
                  <GradientCardList
                    list={section.list}
                    actionIcons={actionIcons}
                    labels={labels}
                    textType={textType}
                  />
                )}
              </MainCard>
            </View>
          );
        })}
    </>
  );
}

export default function ServiceData({ navigation, route, ...props }) {
  const { name } = route.params;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWhatYouNeedServiceData(name));
  }, []);

  let data = useSelector(({ whatYouNeedServiceData }) => {
    return whatYouNeedServiceData.whatYouNeedServiceData;
  });

  let whatYouNeedServiceDataFetchInProgress = useSelector(
    ({ whatYouNeedServiceData }) =>
      whatYouNeedServiceData.whatYouNeedServiceDataFetchInProgress,
  );
  let whatYouNeedServiceDataFetchError = useSelector(
    ({ whatYouNeedServiceData }) =>
      whatYouNeedServiceData.whatYouNeedServiceDataFetchError,
  );

  return (
    <>
      {whatYouNeedServiceDataFetchInProgress ? (
        <Loader />
      ) : !whatYouNeedServiceDataFetchError && data ? (
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
  cardsContainer: { paddingHorizontal: '19@ms' },
  titleStyle: { paddingLeft: '0@ms' },
  titleTextStyle: fontSize =>
    ScaledSheet.create({
      fontSize: fontSize.h1,
      marginLeft: '0@ms',
      marginBottom: '8@ms',
    }),
  leftContainerStyle: { margin: 0 },
  descriptionSectionStyle: { padding: 0, paddingLeft: 0, marginBottom: '8@ms' },
  listTitle: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      top: '4@ms',
      marginBottom: '8@ms',
      //padding: '5@ms',
      lineHeight: '24@ms',
      //fontWeight: 'bold',
      color: colors.primary,
      fontFamily: fontFamily.bold,
    }),
  cardSkeleton: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    elevation: 0,
    overflow: 'hidden',
    marginLeft: '0@ms',
  },
});
