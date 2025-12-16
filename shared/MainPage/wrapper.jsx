import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { setActiveDrawer } from '../../settings/store/dispatchers';
import { useDispatch, useSelector } from 'react-redux';
import * as crashlytics from '../../utils/Crashlytics';
import MainPage from './index';

export default function MainPageWrapper({
  pageName,
  pageTitle,
  loader,
  selectors,
  renderItem,
  keyExtractor,
  listSelector
}) {

  const dispatch = useDispatch();

  useEffect(() => {    
    onRefresh();
  }, []);

  //useFocusEffect(() => dispatch(setActiveDrawer({drawer: pageName})))    

  const onRefresh = pageId => dispatch(loader(pageId));

  let data = useSelector(selectors.dataSelector);
  let fetchInProgress = useSelector(selectors.fetchInProgressSelector);
  let fetchError = useSelector(selectors.fetchErrorSelector);
  let fetchMoreInProgress = useSelector(selectors.fetchMoreInProgressSelector);
  let fetchMore = useSelector(selectors.fetchMoreSelector); 

  return (
    <MainPage
      pageName={pageName}
      pageTitle={pageTitle}
      onRefresh={onRefresh}
      data={data}
      list={listSelector(data)}
      renderItem={renderItem}
      loading={fetchInProgress}
      loadingMore={fetchMoreInProgress}
      fetchMore={fetchMore}
      error={fetchError}
      keyExtractor={keyExtractor}
    />
  );
}
