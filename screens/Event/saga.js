import {
  takeLatest,
  call,
  put,
  select,
  all,
  takeEvery,
  take,
} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';
import {PAGE_LIMIT} from '@env';

function getEventsApi({pageId}) {
  return Api.get(`/events?pageId=${pageId || 1}&limit=${PAGE_LIMIT}`,
  );
}

function* watchGetEventsActionAsync({pageId}) {
  try {    
    const {response} = yield call(getEventsApi, {pageId});    
    yield put({
      type: actions.ON_FETCH_EVENTS_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_EVENTS_ERROR,
      details: {error},
    });
  }
}

function* watchGetMoreEventsActionAsync({pageId}) {
  try {
    const {response} = yield call(getEventsApi, {pageId});
    yield put({
      type: actions.ON_FETCH_MORE_EVENTS_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_MORE_EVENTS_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(actions.FETCH_EVENTS, watchGetEventsActionAsync),
  takeLatest(
    actions.FETCH_MORE_EVENTS,
    watchGetMoreEventsActionAsync,
  ),
];
