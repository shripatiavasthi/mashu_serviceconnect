import Actions from './actions';

const defaultState = {
  detailNotifData: null,
  detailNotifDataFetchInProgress: false,
  detailNotifDataFetchError: null,
};

function DetailedNotificationReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_DETAILED_NOTIFICATION:
      return {
        ...state,
        detailNotifData: null,
        detailNotifDataFetchInProgress: true,
        detailNotifDataFetchError: null        
      };
    case Actions.ON_FETCH_DETAILED_NOTIFICATION_SUCCESS:
      return {
        ...state,
        detailNotifDataFetchInProgress: false,
        detailNotifData: action.details.data,
      };
    case Actions.ON_FETCH_DETAILED_NOTIFICATION_ERROR:
      return {
        ...state,
        detailNotifDataFetchInProgress: false,
        detailNotifDataFetchError: action.details.error,
      };

    default:
      return {...state};
  }
}

export default DetailedNotificationReducer;
