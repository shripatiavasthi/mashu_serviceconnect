import React, {useEffect} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import MainCard from '../../shared/MainCard';
import MainHeader from '../../shared/MainHeader';
import MainPage from '../../shared/MainPage';
import DataCard from './DataCard';
import {getServiceContent} from './store/dispatchers';

export default function ServiceData({navigation, route, ...props}) {
  const {name} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = pageId => dispatch(getServiceContent(name, pageId));

  let data = useSelector(({serviceContent}) => {
    if (
      serviceContent &&
      serviceContent.serviceContentMap &&
      serviceContent.serviceContentMap[name]
    ) {
      return serviceContent.serviceContentMap[name];
    } else {
      return null;
    }
  });
  let fetchInProgress = useSelector(
    ({serviceContent}) => serviceContent.serviceContentFetchInProgress,
  );
  let fetchError = useSelector(
    ({serviceContent}) => serviceContent.serviceContentFetchError,
  );
  let fetchMoreInProgress = useSelector(
    ({serviceContent}) => serviceContent.serviceContentFetchMoreInProgress,
  );
  let fetchMore = useSelector(
    ({serviceContent}) => serviceContent.serviceContentFetchMore,
  );

  const _renderHeader = () => {
    if (!data) return null;
    return (
      <MainHeader
        note={data.note}
        textType={data.textType}
        overview={{text: data.overview, textTypeLabel: 'overview'}}
      />
    );
  };

  const _renderItem = ({item}) => (
    <View style={styles.cardsContainer}>
      <MainCard
        textType={data.textType}
        title={{text: item.title, textTypeLabel: 'list.title'}}
        description={{
          text: item.description,
          textTypeLabel: 'list.description',
        }}>
        <DataCard
          navigation={navigation}
          data={item}
          labels={data.labels}
          contentName={item.title}
        />
      </MainCard>
    </View>
  );

  return (
    <MainPage
      pageName={name}
      onRefresh={onRefresh}
      header={_renderHeader}
      data={data}
      list={data?.list}
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
  cardsContainer: {paddingHorizontal: '10@ms'},
});
