import React from 'react';
import Home from './Home';
import ServiceConnect from './ServiceConnect';
import Training from './Training';
import Login from './Login';
import WhatYouNeed from './WhatYouNeed';
import JobAssistance from './JobAssistance';
import EmergencyHelp from './EmergencyHelp';
import LegalInformation from './LegalInformation';
import BuildYourSkills from './BuildYourSkills';
import Service from './Services';

export const HomeScreen = ({navigation}) => <Home navigation={navigation} />;
export const ServiceConnectScreen = ({navigation, route}) => (
  <ServiceConnect navigation={navigation} route={route} />
);
export const EmergencyHelpScreen = ({navigation, route}) => (
  <EmergencyHelp navigation={navigation} route={route} />
);
export const TrainingScreen = ({navigation}) => (
  <Training navigation={navigation} />
);
export const LoginScreen = ({navigation}) => <Login navigation={navigation} />;
export const WhatYouNeedScreen = ({navigation, route}) => (
  <WhatYouNeed navigation={navigation} route={route} />
);
export const LegalInformationScreen = ({navigation, route}) => (
  <LegalInformation navigation={navigation} route={route} />
);

export const JobAssistanceScreen = ({navigation, route}) => (
  <JobAssistance navigation={navigation} route={route} />
);

export const BuildYourSkillsScreen = ({navigation, route}) => (
  <BuildYourSkills navigation={navigation} route={route} />
);
export const ServiceScreen = ({navigation, route}) => (
  <Service navigation={navigation} route={route} />
);
