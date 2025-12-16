import Actions from './actions';

const defaultState = {
  emergencyHelp: null,
  emergencyHelpFetchInProgress: false,
  emergencyHelpFetchSuccess: false,
  emergencyHelpFetchError: null,
};

function EmergencyHelpReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_EMERGENCY_HELP:
      return {
        ...state,
        emergencyHelpFetchInProgress: true,
        emergencyHelpFetchSuccess: false,
        emergencyHelpFetchError: null,
      };
    case Actions.ON_FETCH_EMERGENCY_HELP_SUCCESS:
      return {
        ...state,
        emergencyHelpFetchInProgress: false,
        emergencyHelpFetchSuccess: true,
        emergencyHelp: {...action.details.data},
      };
    case Actions.ON_FETCH_EMERGENCY_HELP_ERROR:
      return {
        ...state,
        emergencyHelpFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default EmergencyHelpReducer;
