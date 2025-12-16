import {all, takeEvery, take} from 'redux-saga/effects';
// import {REHYDRATE} from 'redux-persist/lib/constants';
import homeSaga from './screens/Home/saga';
import serviceConnectSaga from './screens/ServiceConnect/saga';
import notificationSaga from './screens/Notification/saga';
import detailedNotificationSaga from './screens/NotificationDetailed/saga';
import eventSaga from './screens/Event/saga';
import detailedEventSaga from './screens/EventDetailed/saga';
import settingsSaga from './settings/saga';
import mainServiceSaga from './screens/Services/saga';
import serviceItemSaga from './screens/ServiceItems/saga';
import serviceContentSaga from './screens/ServiceContent/saga';
import * as crashlytics from './utils/Crashlytics';
export default function* rootSaga() {
  crashlytics.log('Waiting for rehydration');
  // yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  // crashlytics.log('Rehydrated');
  yield all([
    ...homeSaga,
    ...serviceConnectSaga,
    ...notificationSaga,
    ...detailedNotificationSaga,
    ...eventSaga,
    ...detailedEventSaga,
    ...settingsSaga,
    ...mainServiceSaga,
    ...serviceItemSaga,
    ...serviceContentSaga,
  ]);
}
