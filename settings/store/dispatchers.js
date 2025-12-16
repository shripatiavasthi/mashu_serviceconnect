import Actions from './actions';

function getSettings() {
  return {type: Actions.FETCH_SETTINGS};
}

function setActiveDrawer(payload) {
  return {type: Actions.SET_ACTIVE_DRAWER, payload};
}

function setLanguage(payload) {
  return {type: Actions.SET_LANGUAGE, payload};
}

function setLocation(payload) {
  return {type: Actions.SET_LOCATION, payload};
}

function setNetStatus(payload) {
  return {type: Actions.SET_NET_STATUS, payload};
}

function setToken(payload) {
  return {type: Actions.SET_TOKEN, payload};
}

function showToast(payload) {
  return {type: Actions.SHOW_TOAST, payload};
}

export {
  setLanguage,
  setActiveDrawer,
  getSettings,
  setLocation,
  setNetStatus,
  setToken,
  showToast
};
