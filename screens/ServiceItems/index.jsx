import React, { useEffect } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-elements';
import GradientCard from '../../shared/GradientCard/card';
import MainHeader from '../../shared/MainHeader';
import MainPage from '../../shared/MainPage';
import { getServiceItem } from './store/dispatchers';
import DynamicText from '../../shared/DynamicText';
import LocationChecker from './LocationChecker';

export default function ServiceData({ navigation, route }) {
  const { name } = route.params;
  const { colors, fontFamily, fontSize } = useTheme().theme;

  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = pageId => dispatch(getServiceItem(name, pageId));

  let data = useSelector(({ serviceItem }) => {
    if (
      serviceItem &&
      serviceItem.serviceItemMap &&
      serviceItem.serviceItemMap[name]
    ) {
      let d = serviceItem.serviceItemMap[name];
      let s = d && d.sections && d.sections.length > 0 ? d.sections[0] : null;
      return { ...d, section: s };
    } else {
      return null;
    }
  });
  let fetchInProgress = useSelector(
    ({ serviceItem }) => serviceItem.serviceItemFetchInProgress,
  );
  let fetchError = useSelector(
    ({ serviceItem }) => serviceItem.serviceItemFetchError,
  );
  let fetchMoreInProgress = useSelector(
    ({ serviceItem }) => serviceItem.serviceItemFetchMoreInProgress,
  );
  let fetchMore = useSelector(({ serviceItem }) => serviceItem.serviceItemFetchMore);
  let location = useSelector(({ settings }) => settings.location);
  useEffect(() => {
    onRefresh()
  }, [location])
  const _renderHeader = () => {
    if (!data) return null;
    return (
      <>
        <MainHeader
          note={data.note}
          textType={data.textType}
          overview={{ text: data.overview, textTypeLabel: 'sections.overview' }}
        />
        {data.section?.listTitle ? (
          <DynamicText
            textType={data.textType}
            textTypeLabel="sections.listTitle"
            text={data.section?.listTitle}
            style={styles.listTitle(colors, fontFamily, fontSize)}
          />
        ) : null}
      </>
    );
  };

  const _renderItem = ({ item }) => (
    <GradientCard
      item={item}
      actionIcons={data.actionIcons}
      labels={data.labels}
      textType={data.textType}
      cardStyle={styles.gradientStyle}
      navigation={navigation}
    />
  );

  return (
    <MainPage
      pageName={name}
      onRefresh={onRefresh}
      header={_renderHeader}
      data={data}
      list={data?.section?.list}
      renderItem={_renderItem}
      loadingMore={fetchMoreInProgress}
      loading={fetchInProgress}
      error={fetchError}
      fetchMore={fetchMore}
      pageStyle={styles.pageContainer}
    />
  );
}
const styles = ScaledSheet.create({
  pageContainer: {},
  listTitle: (colors, fontFamily, fontSize) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      padding: '5@ms',
      marginHorizontal: '15@ms',
      lineHeight: '24@ms',
      color: colors.primary,
      fontFamily: fontFamily.bold,
    }),
  gradientStyle: {
    marginHorizontal: '14@ms',
  },
});
