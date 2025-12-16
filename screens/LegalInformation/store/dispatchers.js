import Actions from './actions';

function getLegalInformation() {
  return {type: Actions.FETCH_LEGAL_INFORMATION};
}

export {getLegalInformation};
