import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './store/dispatchers';
import * as crashlytics from '../utils/Crashlytics';

// Push notifications are intentionally disabled for this build.
const NotificationManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken({ token: null }));
    crashlytics.log('NotificationManager: push notifications are disabled.');
  }, [dispatch]);

  return null;
};

export default NotificationManager;
