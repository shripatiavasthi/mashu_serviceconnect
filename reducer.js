import homeReducer from './screens/Home/store/reducer';
import serviceConnectReducer from './screens/ServiceConnect/store/reducer';
import notificationReducer from './screens/Notification/store/reducer';
import detailedNotificationReducer from './screens/NotificationDetailed/store/reducer';
import eventReducer from './screens/Event/store/reducer';
import detailedEventReducer from './screens/EventDetailed/store/reducer';
import settingsReducer from './settings/store/reducer';
import mainServiceReducer from './screens/Services/store/reducer';
import serviceItemReducer from './screens/ServiceItems/store/reducer';
import serviceContentReducer from './screens/ServiceContent/store/reducer';
export default {
  home: homeReducer,
  serviceConnect: serviceConnectReducer,
  notification: notificationReducer,
  detailedNotification: detailedNotificationReducer,
  event: eventReducer,
  detailedEvent: detailedEventReducer,
  settings: settingsReducer,
  mainService: mainServiceReducer,
  serviceItem: serviceItemReducer,
  serviceContent: serviceContentReducer,
};
