import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CreateWorkout from '../screens/CreateWorkout';
import Mensurations from '../screens/Mensurations';
import Planning from '../screens/Planning';
import AddSession from '../screens/AddSession';
import Exercises from '../screens/Exercises.js';
import Exercise from '../screens/Exercise.js';

import HeaderProfilePicture from '../components/headers/HeaderProfilePicture';
import HeaderTitleCustom from '../components/headers/HeaderTitleCustom';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <HeaderProfilePicture />,
          headerRight: () => <HeaderTitleCustom Title="Good Morning!" />,
        }}
      />
      <Stack.Screen
        name="CreateWorkout"
        component={CreateWorkout}
        options={{
          headerTitle: () => '',
          headerRight: () => <HeaderTitleCustom Title="Programme" />,
        }}
      />
      <Stack.Screen
        name="Mensurations"
        component={Mensurations}
        options={{
          headerTitle: () => '',
          headerRight: () => <HeaderTitleCustom Title="Mensurations" />,
        }}
      />
      <Stack.Screen
        name="Planning"
        component={Planning}
        options={{
          headerTitle: () => '',
          headerRight: () => <HeaderTitleCustom Title="Planning" />,
        }}
      />
      <Stack.Screen
        name="AddSession"
        component={AddSession}
        options={{
          headerTitle: () => '',
          headerRight: () => <HeaderTitleCustom Title="Ajouter une Séance" />,
        }}
      />
      <Stack.Screen
        name="Exercices"
        component={Exercises}
        options={{
          headerTitle: () => '',
          headerRight: () => <HeaderTitleCustom Title="Les Exercices" />,
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        options={{
          headerTitle: () => '',
          headerRight: () => <HeaderTitleCustom Title="Les Exercices" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
