import React from 'react';
import Routes from './src/config/routes';
import {SafeAreaView} from 'react-native';
import {Dimensions} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

//On mets les routes dans un composant "Routes"
const App = () => {
  // j'ai essayé de mettre firebase, le token marche mais impossible d'envoyer une notification
  firebase
    .messaging()
    .getToken()
    .then(fcmToken => {
      if (fcmToken) {
        console.log(fcmToken);
      } else {
        // user doesn't have a device token yet
      }
    });
  return <Routes />;
};

export default App;
