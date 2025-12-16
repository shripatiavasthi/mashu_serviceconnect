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

function getNotificationsApi({pageId, token}) {
  return Api.get(
    `/notifications?deviceToken=${token}&pageId=${pageId || 1}&limit=${PAGE_LIMIT}`,
  );
}

function* watchGetNotificationsActionAsync({pageId}) {
  try {
    const token = yield select(({settings}) => settings.token);
    const {response} = yield call(getNotificationsApi, {pageId, token});
    yield put({
      type: actions.ON_FETCH_NOTIFICATIONS_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_NOTIFICATIONS_ERROR,
      details: {error},
    });
  }
}

function* watchGetMoreNotificationsActionAsync({pageId}) {
  try {
    const {response} = yield call(getNotificationsApi, {pageId});
    yield put({
      type: actions.ON_FETCH_MORE_NOTIFICATIONS_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_MORE_NOTIFICATIONS_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(actions.FETCH_NOTIFICATIONS, watchGetNotificationsActionAsync),
  takeLatest(
    actions.FETCH_MORE_NOTIFICATIONS,
    watchGetMoreNotificationsActionAsync,
  ),
];
