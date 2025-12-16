import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDrawer } from '../../settings/store/dispatchers';
import MainCard from '../../shared/MainCard';
import MainHeader from '../../shared/MainHeader';
import MainPage from '../../shared/MainPage';
import DataCard from './DataCard';
import { getServices } from './store/dispatchers';
import { events, sendAnalytics } from '../../utils/firebaseAnalytics';

export default function Service({ navigation, route, ...props }) {
  const { name } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
    dispatch(setActiveDrawer({ drawer: name }));
  }, [route.params]);

  const onRefresh = () => dispatch(getServices(name));

  let data = useSelector(({ mainService }) => {
    if (
      mainService &&
      mainService.mainServiceMap &&
      mainService.mainServiceMap[name]
    ) {
      return mainService.mainServiceMap[name];
    } else {
      return null;
    }
  });
  let fetchInProgress = useSelector(
    ({ mainService }) => mainService.mainServiceFetchInProgress,
  );
  let fetchError = useSelector(
    ({ mainService }) => mainService.mainServiceFetchError,
  );

  const _renderHeader = () => {
    if (!data) return null;
    return (
      <MainHeader
        textType={data.textType}
        overview={{ text: data.overview, textTypeLabel: 'overview' }}
      />
    );
  };

  const _renderItem = ({ item }) => (
    <View style={styles.cardsContainer}>
      <MainCard
        onPress={() =>
          navigation.push(item.screenType ? item.screenType : 'items', item)
        }
        name={item.name}
        showNavigationOnRightSide={true}
        textType={data.textType}
        title={{ text: item.title, textTypeLabel: 'services.title' }}
        description={{
          text: item.description,
          textTypeLabel: 'services.description',
        }}
        iconName={item.iconName}
        iconUrl={item.iconUrl}
        cardSkeleton={styles.cardSkeleton}
        titleStyle={styles.titleStyle}>
        {item.data && (
          <DataCard data={item.data} name={item.name} labels={item.labels} />
        )}
      </MainCard>
    </View>
  );

  return (
    <MainPage
      pageName={name}
      onRefresh={onRefresh}
      header={_renderHeader}
      data={data}
      list={data?.services}
      renderItem={_renderItem}
      loading={fetchInProgress}
      error={fetchError}
    />
  );
}
const styles = ScaledSheet.create({
  cardsContainer: { paddingHorizontal: '10@ms' },
  titleStyle: { paddingBottom: '0@ms' },
  cardSkeleton: { minHeight: '65@ms' },
});
