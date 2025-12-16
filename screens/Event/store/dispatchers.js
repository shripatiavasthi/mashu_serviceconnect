import Actions from './actions';

function getEvents(pageId) {
  return {
    type:
      pageId && pageId > 1
        ? Actions.FETCH_MORE_EVENTS
        : Actions.FETCH_EVENTS,
    pageId,
  };
}

export {getEvents};
