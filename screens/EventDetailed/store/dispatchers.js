import Actions from './actions';

function getDetailedEvent(id) {
  return {type: Actions.FETCH_DETAILED_EVENT, id};
}

export {getDetailedEvent};
