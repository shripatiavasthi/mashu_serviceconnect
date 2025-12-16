import {
  takeLatest,
  call,
  put,
  select,
  all,
  takeEvery,
  take,
} from 'redux-saga/effects';
import homeActions from './store/actions';
import Api from '../../utils/Api';

function getServicesApi() {
  return Api.get(`/services`);
}
function getUnreadNotificationCountApi({token}) {
  const data = Api.get(`/notifications/unread/count?deviceToken=${token}`);
  return data;
}
function getBannersApi() {
  return Api.get(`/banners`);
}
function getEventsApi() {
  return Api.get(`/events/upcoming`);
}
function* watchGetServicesActionAsync() {
  try {
    const {response} = yield call(getServicesApi);
    yield put({
      type: homeActions.ON_FETCH_HOME_SERVICES_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: homeActions.ON_FETCH_HOME_SERVICES_ERROR,
      details: {error},
    });
  }
}
function* watchGetBannersActionAsync() {
  try {
    const {response} = yield call(getBannersApi);
    yield put({
      type: homeActions.ON_GET_BANNERS_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: homeActions.ON_GET_BANNERS_ERROR,
      details: {error},
    });
  }
}
function* watchGetEventsActionAsync() {
  try {
    const {response} = yield call(getEventsApi);     
    yield put({
      type: homeActions.ON_GET_EVENTS_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: homeActions.ON_GET_EVENTS_ERROR,
      details: {error},
    });
  }
}
function* watchGetUnreadNotificationCountActionAsync() {
  try {
    const token = yield select(({settings}) => settings.token);
    const {response} = yield call(getUnreadNotificationCountApi, {token});
    yield put({
      type: homeActions.ON_GET_UNREAD_NOTIFICATION_COUNT_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: homeActions.ON_GET_UNREAD_NOTIFICATION_COUNT_ERROR,
      details: {error},
    });
  }
}
export default [
  takeLatest(homeActions.FETCH_HOME_SERVICES, watchGetServicesActionAsync),
  takeLatest(homeActions.GET_BANNERS, watchGetBannersActionAsync),
  takeLatest(homeActions.GET_EVENTS, watchGetEventsActionAsync),
  takeLatest(
    homeActions.GET_UNREAD_NOTIFICATION_COUNT,
    watchGetUnreadNotificationCountActionAsync,
  ),
];
