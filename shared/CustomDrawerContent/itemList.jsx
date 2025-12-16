import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { useTheme } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDrawer } from '../../settings/store/dispatchers';
import CustomIcon from '../CustomIcon';
import DynamicText from '../DynamicText';

export default CustomDrawerItemList = ({menuItems, ...props}) => {
  const {colors, fontSize, fontFamily} = useTheme().theme;
  const dispatch = useDispatch();
  let activeDrawer = useSelector(({settings}) => settings.activeDrawer);

  return (
    menuItems &&
    menuItems.map(item => {
      const focused = activeDrawer === item.name;
      return (
        <DrawerItem
          key={item.name}
          focused={focused}
          activeTintColor={colors.white}
          inactiveTintColor={colors.lightGray}
          activeBackgroundColor={colors.primary}
          style={styles.drawerItem}
          label={() => (
            <DynamicText
              numberOfLines={1}
              text={item.displayName}
              style={styles.drawerLabelStyle(
                colors,
                fontSize,
                fontFamily,
                focused,
              )}
            />
          )}
          onPress={() =>
            dispatch(
              setActiveDrawer({drawer: item.name}),
              props.navigation.navigate(
                !item.screenType || item.screenType == 'custom'
                  ? item.name
                  : item.screenType,
                item,
              ),
            )
          }
          icon={() => (
            <CustomIcon
              iconUrl={item.iconUrl}
              height={20}
              width={20}
              color={focused ? colors.white : colors.black}
            />
          )}
        />
      );
    })
  );
};

const styles = ScaledSheet.create({
  drawerItem: {
    borderRadius: 0,
    marginLeft: 0,
    paddingLeft: 23,
    marginRight: 0,
  },
  drawerLabelStyle: (colors, fontSize, fontFamily, focused) =>
    ScaledSheet.create({
      fontSize: fontSize.h2,
      marginLeft: '-15@ms',
      color: focused ? colors.white : colors.black,
      fontFamily: focused ? fontFamily.bold : fontFamily.regular,
    }),
});
