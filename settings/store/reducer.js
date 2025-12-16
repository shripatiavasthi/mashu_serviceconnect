import Toast from 'react-native-toast-message';
import Actions from './actions';

const defaultState = {
  settingsData: null,
  settingsFetchInProgress: false,
  settingsFetchError: null,
  activeDrawer: 'home',
  language: null,
  location: null,
  isConnected: true,
  token: null,
};

function SettingsReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_SETTINGS:
      return {
        ...state,
        settingsFetchInProgress: true,
        settingsFetchError: null,
      };
    case Actions.ON_FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settingsFetchInProgress: false,
        settingsData: action.details.data,
      };
    case Actions.ON_FETCH_SETTINGS_ERROR:
      return {
        ...state,
        settingsFetchError: action.details.error,
      };
    case Actions.SET_ACTIVE_DRAWER:
      return {
        ...state,
        activeDrawer: action.payload.drawer,
      };
    case Actions.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload.language,
      };
    case Actions.SET_LOCATION:
      return {
        ...state,
        location: action.payload.location,
      };
    case Actions.SET_NET_STATUS:
      return {
        ...state,
        isConnected: action.payload.isConnected,
      };
    case Actions.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case Actions.SHOW_TOAST:
      let toastMsg = '';
      if (action.payload.msg) {
        try {
          toastMsg = action.payload.msg[state.language];
        } catch (err) {
          toastMsg = '';
        }
      }
      Toast.show({
        type: action.payload.type,
        text1: toastMsg,
        text2: action.payload.detail,
      });
      return {
        ...state,
      };
    default:
      return {...state};
  }
}

export default SettingsReducer;
