import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeStack from './HomeStack';
import {Dimensions} from 'react-native';
import AddSession from '../screens/AddSession';
import HeaderTitleCustom from '../components/headers/HeaderTitleCustom';
import Planning from '../screens/Planning';

const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get('window').width;
//Création du router
const Routes = props => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={PageTheme}>
        <Tab.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
              width: '80%',
              shadowColor: 'transparent',
              borderTopColor: 'transparent',
              backgroundColor: '#20252e',
              position: 'absolute',
              left: '50%',
              marginLeft: -((windowWidth * 0.8) / 2),
              bottom: 20,
              borderRadius: 15,
              height: 60,
              paddingTop: 10,
              paddingBottom: 10,
            },
            tabBarActiveTintColor: '#fffffe',
            tabBarInactiveTintColor: '#8d8d8d',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              title: 'Accueil',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AddSession"
            component={AddSession}
            options={{
              title: 'Séance',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="plus" color={color} size={26} />
              ),
              headerTitle: () => '',
              headerRight: () => (
                <HeaderTitleCustom Title="Ajouter une Séance" />
              ),
              headerShown: true,
            }}
          />
          <Tab.Screen
            name="Planning"
            component={Planning}
            options={{
              title: 'Planning',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="calendar-month"
                  color={color}
                  size={26}
                />
              ),
              headerTitle: () => '',
              headerRight: () => <HeaderTitleCustom Title="Votre Planning" />,
              headerShown: true,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const PageTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export default Routes;
