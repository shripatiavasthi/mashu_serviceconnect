import Actions from './actions';

const defaultState = {
  legalInformation: null,
  legalInformationFetchInProgress: false,
  legalInformationFetchSuccess: false,
  legalInformationFetchError: null,
};

function LegalInformationReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_LEGAL_INFORMATION:
      return {
        ...state,
        legalInformationFetchInProgress: true,
        legalInformationFetchSuccess: false,
        legalInformationFetchError: null,
      };
    case Actions.ON_FETCH_LEGAL_INFORMATION_SUCCESS:
      return {
        ...state,
        legalInformationFetchInProgress: false,
        legalInformationFetchSuccess: true,
        legalInformation: {...action.details.data},
      };
    case Actions.ON_FETCH_LEGAL_INFORMATION_ERROR:
      return {
        ...state,
        legalInformationFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default LegalInformationReducer;
