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
import actionsMain from '../Notification/store/actions';
import Api from '../../utils/Api';

function getDetailedNotificationsApi({id, token}) {
  return Api.get(`/notifications/${id}?deviceToken=${token}`);
}

function* watchGetDetailedNotificationsActionAsync({id}) {
  try {
    const token = yield select(({settings}) => settings.token);    
    const {response} = yield call(getDetailedNotificationsApi, {id, token});
    yield put({
      type: actions.ON_FETCH_DETAILED_NOTIFICATION_SUCCESS,
      details: response.data,
    });
    yield put({
      type: actionsMain.MARK_AS_READ,
      details: response.data.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_DETAILED_NOTIFICATION_ERROR,
      details: {error},
    });
  }
}
export default [
  takeLatest(
    actions.FETCH_DETAILED_NOTIFICATION,
    watchGetDetailedNotificationsActionAsync,
  ),
];
