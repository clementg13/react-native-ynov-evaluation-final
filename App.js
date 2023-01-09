import React from 'react';
import Routes from './src/config/routes';
import {SafeAreaView} from 'react-native';
import {Dimensions} from 'react-native';
// import GlobalFonts from './src/assets/fonts/fonts.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//On mets les routes dans un composant "Routes"
const App = () => {
  return <Routes />;
};

export default App;
