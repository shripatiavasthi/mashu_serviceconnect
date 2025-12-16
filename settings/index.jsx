import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from './store/dispatchers';
import * as crashlytics from '../utils/Crashlytics';

const SettingsLoader = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
  }, []);

  let settings = useSelector(({ settings }) => settings);
  useEffect(() => {
    if (!settings.settingsData && settings.isConnected) {
      crashlytics.log(`refreshing settings`);
      onRefresh();
    }
  }, [settings.isConnected]);

  const onRefresh = () => dispatch(getSettings());

  return null;
};

export default SettingsLoader;
