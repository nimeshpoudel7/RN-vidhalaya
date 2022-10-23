import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ComponentType } from 'react';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { Feed, Settings, Style } from '@/screens';
import type { ImgProps } from '@/ui';
import {
  AddButton,
  Home as FeedIcon,
  Settings as SettingsIcon,
  Style as StyleIcon,
} from '@/ui';
import colors from '@/ui/theme/colors';

type TabParamList = {
  Style: undefined;
  Profile: undefined;
  Settings: undefined;
  Add: undefined;
  Unknown: undefined;
};

type TabType = {
  name: keyof TabParamList;
  component: ComponentType<any>;
  label: string;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps | ImgProps) => JSX.Element;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabsIcons: TabIconsType = {
  Profile: (props: SvgProps) => <FeedIcon {...props} />,
  Style: (props: SvgProps) => <StyleIcon {...props} />,
  Settings: (props: SvgProps) => <SettingsIcon {...props} />,
  Add: (props: SvgProps) => (
    <AddButton
      style={{ bottom: 36, ...TabStyle.shadow, backgroundColor: '#0000' }}
      {...props}
    />
  ),
  Unknown: (props: SvgProps) => <SettingsIcon {...props} />,
};

export type TabList<T extends keyof TabParamList> = {
  navigation: StackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'Profile',
    component: Feed,
    label: 'Feed',
  },
  {
    name: 'Style',
    component: Style,
    label: 'Style',
  },

  {
    name: 'Add',
    component: Settings,
    label: 'Add',
  },
  {
    name: 'Unknown',
    component: Settings,
    label: 'Unknown',
  },
  {
    name: 'Settings',
    component: Settings,
    label: 'Settings',
  },
];

type BarIconType = {
  name: keyof TabParamList;
  color: string;
};

const BarIcon = ({ color, name, ...reset }: BarIconType) => {
  console.log(name);
  const Icon = tabsIcons[name];
  console.log('heeee', Icon);
  return <Icon color={color} {...reset} />;
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,

        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color }) => <BarIcon name={route.name} color={color} />,
        tabBarActiveTintColor: '#5151C6',
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarStyle: [
          { backgroundColor: '#FFFFFF' },
          {
            position: 'absolute',
            bottom: 1,
            left: 10,
            right: 10,
            // elevation:0,
            borderTopStartRadius: 17,
            borderTopEndRadius: 17,
            // borderRadius:17,
            height: 80,
            ...TabStyle.shadow,
          },
          { borderTopWidth: 1, borderTopColor: colors.neutral[200] },
        ],
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};

const TabStyle = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.0,
    backgroundColor: '#ffffff', // invisible color

    elevation: 24,
  },
  // // shadowOffset: { width: 10, height: 10 },
  // shadowColor: 'black',
  // shadowOpacity: 1,
  // elevation: 3,
  // // background color must be set
});
