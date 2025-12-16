import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveDrawer} from '../../settings/store/dispatchers';
import MainCard from '../../shared/MainCard';
import MainHeader from '../../shared/MainHeader';
import MainPage from '../../shared/MainPage';
import DataCard from './DataCard';
import {getServiceConnect} from './store/dispatchers';

export default function ServiceConnect({navigation, route, ...props}) {
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
    dispatch(setActiveDrawer({drawer: route.params.name}));
  }, []);

  const onRefresh = () => dispatch(getServiceConnect());

  let data = useSelector(({serviceConnect}) => {
    return serviceConnect.serviceConnect;
  });
  let fetchInProgress = useSelector(
    ({serviceConnect}) => serviceConnect.serviceConnectFetchInProgress,
  );
  let fetchError = useSelector(
    ({serviceConnect}) => serviceConnect.serviceConnectFetchError,
  );

  const _renderHeader = () => {
    if (!data) return null;
    return (
      <MainHeader
        textType={data.textType}
        overview={{text: data.overview, textTypeLabel: 'overview'}}
      />
    );
  };

  const _renderItem = ({item}) => (
    <View style={styles.cardsContainer}>
      <MainCard
        textType={data.textType}
        title={{text: item.title, textTypeLabel: 'services.title'}}
        description={{
          text: item.description,
          textTypeLabel: 'services.description',
        }}
        iconName={item.iconName}
        iconUrl={item.iconUrl}>
        <DataCard service={item} navigation={navigation} />
      </MainCard>
    </View>
  );

  return (
    <MainPage
      pageName={route.params.name}
      onRefresh={onRefresh}
      header={_renderHeader}
      data={data}
      list={data?.services}
      renderItem={_renderItem}
      loading={fetchInProgress}
      error={fetchError}
      // keyExtractor={item => item.serviceConnectId}
    />
  );
}
const styles = ScaledSheet.create({
  cardsContainer: {paddingHorizontal: '10@ms'},
});
