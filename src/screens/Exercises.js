import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LongCardTitleAndImage from '../components/LongCardTitleAndImage';
import {Text} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {useNavigation} from '@react-navigation/native';
import Image1 from '../assets/images/faire-de-lexercice.png';
import Image2 from '../assets/images/femmes.png';
import Image3 from '../assets/images/femme.png';
import Image4 from '../assets/images/exercice2.png';
import Image5 from '../assets/images/en-cours.png';
import Image6 from '../assets/images/fitness.png';
import Image7 from '../assets/images/muscles.png';
import Image8 from '../assets/images/treadmill.png';
import Image9 from '../assets/images/weightlift.png';
import Image10 from '../assets/images/weightlifter.png';
import Image11 from '../assets/images/workout.png';

const imagesForRandom = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
];
const Exercises = () => {
  const [ExercisesInfo, setExercisesInfo] = useState([
    {id: 0, title: 'Chargement en cours', notload: true},
  ]);
  const [dropdownLoading, setDropdownLoading] = React.useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://638e29d54190defdb7584232.mockapi.io/api/v1/all-exercises')
      .then(res => {
        setExercisesInfo(
          res.data.map(Exercise => {
            return {...Exercise, title: Exercise.nom, key: Exercise.id};
          }),
        );
        setDropdownLoading(false);
      })
      .catch(err => {
        setExercisesInfo({
          id: 0,
          title: "Une erreur c'est produite",
          notload: true,
        });
      });
  }, []);

  let lastImage = '';
  const getImage = () => {
    // permet de ne jamais avoir 2 fois là même image a la suite
    let random = Math.floor(Math.random() * 10);
    while (random == lastImage) {
      random = Math.floor(Math.random() * 10);
    }
    lastImage = random;
    return random;
  };

  const navigationRoute = Exercise => {
    if (Exercise?.notload) {
      return false;
    } else {
      return ['Exercise', Exercise];
    }
  };

  return (
    <Body>
      <AutocompleteDropdown
        dataSet={ExercisesInfo}
        onSelectItem={item =>
          item ? navigation.navigate('Exercise', item) : null
        }
        loading={dropdownLoading}
      />
      <Scroll contentContainerStyle={{paddingTop: 12, paddingBottom: 12}}>
        {ExercisesInfo.map(Exercise => {
          return (
            <CardContainer key={Exercise?.id}>
              <LongCardTitleAndImage
                Title={truncateText(Exercise?.title, 45)}
                NavigationRouteParams={navigationRoute(Exercise)} // je ne passe pas seulement l'id , car il n'y a pas d'info supplémentaire quand on get l'api par l'id
                Image={imagesForRandom[getImage()]}
                width="40"
                ImagemarginTop="0"
              />
            </CardContainer>
          );
        })}
      </Scroll>
    </Body>
  );
};

const Body = styled.View`
  margin: 10px;
`;

const CardContainer = styled.View`
  margin: 10px 0;
`;

function truncateText(text, length) {
  if (text?.length <= length || !text) {
    return text;
  }

  return text.substr(0, length) + '\u2026';
}

const Scroll = styled.ScrollView``;

export default Exercises;
