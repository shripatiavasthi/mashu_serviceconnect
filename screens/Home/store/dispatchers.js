import Actions from './actions';

function getServices() {
  return {type: Actions.FETCH_HOME_SERVICES};
}

function getBanners() {
  return {type: Actions.GET_BANNERS};
}

function getEvents() {
  return {type: Actions.GET_EVENTS};
}

function getUnreadNotificationCount() {
  return {type: Actions.GET_UNREAD_NOTIFICATION_COUNT};
}
export {getServices, getBanners, getEvents, getUnreadNotificationCount};
