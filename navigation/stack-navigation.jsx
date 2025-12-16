import * as React from 'react';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../screens/Home';
import ServiceConnect from '../screens/ServiceConnect';
import Login from '../screens/Login';
import Notification from '../screens/Notification';
import NotificationDetailed from '../screens/NotificationDetailed';
import Event from '../screens/Event';
import EventDetailed from '../screens/EventDetailed';
import SearchScreen from '../screens/SearchScreen';
import ServiceContent from '../screens/ServiceContent';
import ServiceItem from '../screens/ServiceItems';
import Service from '../screens/Services';
import WebViewScreen from '../screens/WebViewScreen';
import AppBar from '../shared/AppBar';
import HomeHeader from '../screens/Home/Header';
import SearchBar from '../screens/SearchScreen/SearchBar';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'home',
    component: Home,
    header: HomeHeader,
  },
  {
    name: 'login',
    component: Login,
    hideHeader: true,
  },
  {
    name: 'service-connect',
    component: ServiceConnect,
  },
  {
    name: 'services',
    component: Service,
  },
  {
    name: 'items',
    component: ServiceItem,
  },
  {
    name: 'content',
    component: ServiceContent,
  },
  {
    name: 'notifications',
    component: Notification,
  },
  {
    name: 'notificationDetailed',
    component: NotificationDetailed,
  },
  {
    name: 'events',
    component: Event,
  },
  {
    name: 'eventDetailed',
    component: EventDetailed,
  },
  {
    name: 'search',
    component: SearchScreen,
    header: SearchBar
  },
  {
    name: 'webViewScreen',
    component: WebViewScreen,
  },
];

export default function StackNaviagtion({ route }) {
  return (
    <Stack.Navigator  >
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            headerShown: !screen.hideHeader,
            header: screen.header || AppBar,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
