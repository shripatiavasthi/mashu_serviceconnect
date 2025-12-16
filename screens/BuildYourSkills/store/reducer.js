import Actions from './actions';

const defaultState = {
  buildYourSkills: null,
  buildYourSkillsFetchInProgress: false,
  buildYourSkillsFetchSuccess: false,
  buildYourSkillsFetchError: null,
};

function BuildYourSkillsReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_BUILD_YOUR_SKILLS:
      return {
        ...state,
        buildYourSkillsFetchInProgress: true,
        buildYourSkillsFetchSuccess: false,
        buildYourSkillsFetchError: null,
      };
    case Actions.ON_FETCH_BUILD_YOUR_SKILLS_SUCCESS:
      return {
        ...state,
        buildYourSkillsFetchInProgress: false,
        buildYourSkillsFetchSuccess: true,
        buildYourSkills: {...action.details.data},
      };
    case Actions.ON_FETCH_BUILD_YOUR_SKILLS_ERROR:
      return {
        ...state,
        buildYourSkillsFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default BuildYourSkillsReducer;
