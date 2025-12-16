import {call, put, takeLatest} from 'redux-saga/effects';
import Api from '../../utils/Api';
import Actions from './store/actions';
import * as crashlytics from '../../utils/Crashlytics';

function getServiceDataApi({serviceName}) {
  return Api.get(`/emergency-help/${serviceName}`);
}

function* watchGetEmergencyHelpServiceDataActionAsync({serviceName}) {
  try {
    const {response} = yield call(getServiceDataApi, {serviceName});
    //crashlytics.log('response', response.data);
    yield put({
      type: Actions.ON_FETCH_EMERGENCYHELP_SERVICE_DATA_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    //crashlytics.log(error);
    yield put({
      type: Actions.ON_FETCH_EMERGENCYHELP_SERVICE_DATA_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(
    Actions.FETCH_EMERGENCYHELP_SERVICE_DATA,
    watchGetEmergencyHelpServiceDataActionAsync,
  ),
];
