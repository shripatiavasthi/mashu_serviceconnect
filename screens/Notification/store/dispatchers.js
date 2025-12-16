import Actions from './actions';

function getNotifications(pageId) {
  return {
    type:
      pageId && pageId > 1
        ? Actions.FETCH_MORE_NOTIFICATIONS
        : Actions.FETCH_NOTIFICATIONS,
    pageId,
  };
}

function markAsRead(notifId) {
  return {type: Actions.MARK_AS_READ, notifId};
}

export {getNotifications, markAsRead};
