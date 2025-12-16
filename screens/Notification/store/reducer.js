import Actions from './actions';
import {hasMore, addMore, addToMap} from '../../../utils/PageController';

const defaultState = {  
  notifData: null,
  notifDataFetchInProgress: false,
  notifDataFetchError: null,  
  notifDataFetchMore: true,
  notifDataFetchMoreInProgress: false,
  notifDataFetchMoreError: null,
  readListMap: {},
};


function NotificationReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_NOTIFICATIONS:
        return {
          ...state,
          notifDataFetchInProgress: true,
          notifDataFetchError: null,
        };
      case Actions.ON_FETCH_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          notifDataFetchInProgress: false,
          notifData: {...action.details.data},
          notifDataFetchMore: hasMore(action.details.data),
        };
      case Actions.ON_FETCH_NOTIFICATIONS_ERROR:
        return {
          ...state,
          notifDataFetchInProgress: false,
          notifDataFetchError: action.details.error,
          notifDataFetchMore: false,
        };
        
    case Actions.FETCH_MORE_NOTIFICATIONS:
      return {
        ...state,
        notifDataFetchMoreInProgress: true,
        notifDataFetchMoreError: null,
      };
    case Actions.ON_FETCH_MORE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifDataFetchMoreInProgress: false,
        notifData: addMore(state.notifData, action.details.data),
        notifDataFetchMore: hasMore(action.details.data),
      };
    case Actions.ON_FETCH_MORE_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notifDataFetchMoreInProgress: false,
        notifDataFetchMoreError: action.details.error,
        notifDataFetchMore: false,
      };
    case Actions.MARK_AS_READ:   
      return {
        ...state,
        readListMap: addToMap(state.readListMap, action.details.id),
      };
    default:
      return {...state};
  }
}

export default NotificationReducer