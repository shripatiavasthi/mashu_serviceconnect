import Actions from './actions';

const defaultState = {
  jobAssistance: null,
  jobAssistanceFetchInProgress: false,
  jobAssistanceFetchSuccess: false,
  jobAssistanceFetchError: null,
};

function JobAssistanceReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_JOB_ASSISTANCE:
      return {
        ...state,
        jobAssistanceFetchInProgress: true,
        jobAssistanceFetchSuccess: false,
        jobAssistanceFetchError: null,
      };
    case Actions.ON_FETCH_JOB_ASSISTANCE_SUCCESS:
      return {
        ...state,
        jobAssistanceFetchInProgress: false,
        jobAssistanceFetchSuccess: true,
        jobAssistance: {...action.details.data},
      };
    case Actions.ON_FETCH_JOB_ASSISTANCE_ERROR:
      return {
        ...state,
        jobAssistanceFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default JobAssistanceReducer;
