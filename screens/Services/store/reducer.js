import Actions from './actions';

const defaultState = {
  mainServiceMap: {},
  mainServiceFetchInProgress: false,
  mainServiceFetchError: null,
};

function MainServiceeducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_MAIN_SERVICE:
      return {
        ...state,
        mainServiceFetchInProgress: true,
        mainServiceFetchError: null,
      };
    case Actions.ON_FETCH_MAIN_SERVICE_SUCCESS:
      const map = {...state.mainServiceMap} 
      map[action.serviceName] = action.details.data
      return {
        ...state,
        mainServiceFetchInProgress: false,
        mainServiceMap: map
      };
    case Actions.ON_FETCH_MAIN_SERVICE_ERROR:
      return {
        ...state,
        mainServiceFetchInProgress: false,
        mainServiceFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default MainServiceeducer;
