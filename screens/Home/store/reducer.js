import Actions from './actions';

const defaultState = {
  servicesData: null,
  servicesFetchInProgress: false,
  servicesFetchError: null,
  bannersData: null,
  bannersFetchInProgress: false,
  bannersFetchError: null,
  eventsData: null,
  eventsFetchInProgress: false,
  eventsFetchError: null,
  unreadNotificationCount: null,
  unreadNotificationCountFetchInProgress: false,
  unreadNotificationCountFetchError: null,
};

function HomeReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_HOME_SERVICES:
      return {
        ...state,
        servicesFetchInProgress: true,
        servicesFetchError: null,
      };
    case Actions.ON_FETCH_HOME_SERVICES_SUCCESS:
      return {
        ...state,
        servicesFetchInProgress: false,
        servicesData: action.details.data,
      };
    case Actions.ON_FETCH_HOME_SERVICES_ERROR:
      return {
        ...state,
        servicesFetchInProgress: false,
        servicesFetchError: action.details.error,
      };
    case Actions.GET_BANNERS:
      return {
        ...state,
        bannersFetchInProgress: true,
        bannersFetchError: null,
      };
    case Actions.ON_GET_BANNERS_SUCCESS:
      return {
        ...state,
        bannersFetchInProgress: false,
        bannersData: action.details.data,
      };
    case Actions.ON_GET_BANNERS_ERROR:
      return {
        ...state,
        bannersFetchInProgress: false,
        bannersFetchError: action.details.error,
      };
    case Actions.GET_EVENTS:
      return {
        ...state,
        eventsFetchInProgress: true,
        eventsFetchError: null,
      };
    case Actions.ON_GET_EVENTS_SUCCESS:      
      return {
        ...state,
        eventsFetchInProgress: false,
        eventsData: action.details.data,
      };
    case Actions.ON_GET_EVENTS_ERROR:
      return {
        ...state,
        eventsFetchInProgress: false,
        eventsFetchError: action.details.error,
      };  
    case Actions.ON_GET_UNREAD_NOTIFICATION_COUNT:
      return {
        ...state,
        unreadNotificationCountFetchInProgress: true,
        unreadNotificationCountFetchError: null,
      };
    case Actions.ON_GET_UNREAD_NOTIFICATION_COUNT_SUCCESS:
      return {
        ...state,
        unreadNotificationCountFetchInProgress: false,
        unreadNotificationCount: action.details.data,
      };
    case Actions.ON_GET_UNREAD_NOTIFICATION_COUNT_ERROR:
      return {
        ...state,
        unreadNotificationCountFetchInProgress: false,
        unreadNotificationCountFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default HomeReducer;
