import React, { useState, useEffect } from 'react';
import { RefreshControl, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import ErrorDetail from '../ErrorDetail';
import EmptyComponent from './emptyComponent'
import { LoadingFooter } from './loadingFooter';
import * as crashlytics from '../../utils/Crashlytics';


const MainPage = ({
  onRefresh,
  header,
  footer,
  keyExtractor,
  data,
  list,
  error,
  loading,
  loadingMore,
  renderItem,
  pageStyle,
  pageName,
  pageTitle,
  fetchMore,
}) => {
  const [pageId, setPageId] = useState(1);

  let isConnected = useSelector(({ settings }) => settings.isConnected);
  useEffect(() => {
    if (error && isConnected) {
      crashlytics.log(`refreshing ${pageName}`);
      onRefresh();
    }
  }, [isConnected]);

  const _renderFooter = footer || <LoadingFooter loadingMore={loadingMore} />;

  const _onEndReached = () => {
    if (onRefresh && fetchMore) {
      let newPageId = pageId + 1;
      setPageId(newPageId);
      onRefresh(newPageId);
    }
  };

  const _refreshControl = onRefresh ? (
    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
  ) : null;

  const _keyExtractor = keyExtractor || (item => item.id);

  const _renderItem = renderItem || null;

  const _renderHeader = data ? header : null;

  return (
    <View style={[styles.pageContainer, pageStyle]}>
      {isConnected && error && <ErrorDetail error={error} />}
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={_renderFooter}
        ListHeaderComponent={_renderHeader}
        onEndReached={_onEndReached}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        data={list}
        ListEmptyComponent={!loading && <EmptyComponent pageTitle={pageTitle} />}
        refreshControl={_refreshControl}
      />
    </View>
  );
};
const styles = ScaledSheet.create({
  pageContainer: { flex: 1 },
  loadingMore: {
    position: 'relative',
    width: 100,
    height: 100,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  spacer: {
    height: '200@ms',
    height: '15@ms',
  },
});

export default MainPage;
