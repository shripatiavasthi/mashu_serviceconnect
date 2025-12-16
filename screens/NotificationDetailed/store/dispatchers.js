import Actions from './actions';

function getDetailedNotification(id) {
  return {type: Actions.FETCH_DETAILED_NOTIFICATION, id};
}

export {getDetailedNotification};
