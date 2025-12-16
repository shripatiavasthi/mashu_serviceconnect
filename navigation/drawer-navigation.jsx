import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import CustomDrawerContent from '../shared/CustomDrawerContent/index';
import StackNaviagtion from './stack-navigation';

const WindowWidth = Dimensions.get('window').width;

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { colors } = useTheme().theme;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: colors.primary,
          drawerActiveTintColor: colors.white,
          drawerInactiveTintColor: colors.lightGray,
          drawerItemStyle: styles.drawerItemStyle,
          drawerStyle: { width: WindowWidth * 0.87 },
          drawerPosition: 'right',
          headerStyle: styles.headerStyle,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name={'root'}
          component={StackNaviagtion}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = ScaledSheet.create({
  drawerItemStyle: {
    borderRadius: 0,
    height: '52@ms',
    marginTop: 0,
    marginHorizontal: 0,
    paddingHorizontal: '10@ms',
    justifyContent: 'center',
  },
  headerStyle: () =>
    ScaledSheet.create({
      height: '60@ms',
    }),
});
