import {View, Text, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef} from 'react';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';

const AddSession = () => {
  const [data, setData] = React.useState(null);
  const [exercises, setExercises] = React.useState([]);
  const [chronometre, setChronometre] = React.useState({
    minutes: 0,
    seconds: 0,
    id: 'chronometre',
  });
  const refDropDownController = useRef(null);
  const [dropdownLoading, setDropdownLoading] = React.useState(true);
  const navigation = useNavigation();

  const addExerciseToSession = item => {
    setExercises([...exercises, item]);
    setData(data.filter(exercise => exercise.id !== item.id));
    console.log([...exercises, item]);
    if (data.filter(exercise => exercise.id !== item.id).length === 0) {
      setData(null);
    }
    refDropDownController.current.clear();
  };

  function AddSerie(exerciseId) {
    const newExercises = exercises.map((exercise, idx) => {
      if (exercise.id !== exerciseId) {
        return exercise;
      }
      if (!exercises[idx].series) {
        exercises[idx].series = [];
      }
      const newSerie = {
        id: exercise.series.length + 1,
        weight: 40,
        reps: 12,
      };
      return {...exercise, series: [...exercise.series, newSerie]};
    });
    setExercises(newExercises);
  }

  function modifyRepsOrWeigth(exerciseId, serieId, serieOptions) {
    const newExercises = exercises.map(exercise => {
      if (exercise.id !== exerciseId) {
        return exercise;
      }
      const newSeries = exercise.series.map(serie => {
        if (serie.id !== serieId) {
          return serie;
        }
        if (serieOptions.weight) {
          return {...serie, weight: parseInt(serieOptions.weight)};
        } else if (serieOptions.reps) {
          return {...serie, reps: parseInt(serieOptions.reps)};
        }
        return serie;
      });
      return {...exercise, series: newSeries};
    });
    setExercises(newExercises);
  }

  function RemoveSerie(exerciseId, serieId) {
    setExercises(
      exercises.map((exercise, idx) => {
        if (exercise?.id === exerciseId) {
          exercise.series = exercise.series.filter(
            serie => serie.id !== serieId,
          );
        }
        return exercise;
      }),
    );
  }

  useEffect(() => {
    axios
      .get('https://638e29d54190defdb7584232.mockapi.io/api/v1/all-exercises')
      .then(res => {
        setData(
          res.data.map(Exercise => {
            return {...Exercise, title: Exercise.nom, key: Exercise.id};
          }),
        );
        setDropdownLoading(false);
      })
      .catch(() => {
        refDropDownController.current.setInputText("Une erreur c'est produite");
      });

    const interval = setInterval(() => {
      setChronometre(prevChronometre => {
        if (prevChronometre.seconds === 59) {
          return {
            id: 'chronometre',
            minutes: prevChronometre.minutes + 1,
            seconds: 0,
          };
        }
        return {
          id: 'chronometre',
          minutes: prevChronometre.minutes,
          seconds: prevChronometre.seconds + 1,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const storeSession = async () => {
    try {
      let AsyncSession = await AsyncStorage.getItem('@Sessions');
      if (AsyncSession) {
        AsyncSession = JSON.parse(AsyncSession);
        let tempExercises = exercises;
        tempExercises.push(chronometre);
        AsyncSession.push(tempExercises);
        await AsyncStorage.setItem(
          '@Sessions',
          JSON.stringify(AsyncSession),
        ).then(() => {
          navigation.navigate('ExercicesHistory');
        });
      } else {
        let tempExercises = exercises;
        tempExercises.push(chronometre);
        AsyncStorage.setItem('@Sessions', JSON.stringify([tempExercises])).then(
          () => {
            navigation.navigate('ExercicesHistory');
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Body>
      <View style={styles.autocompleteContainer}>
        <AutocompleteDropdown
          controller={controller => {
            refDropDownController.current = controller;
          }}
          onSelectItem={item => {
            item ? addExerciseToSession(item) : null;
          }}
          dataSet={data}
          loading={dropdownLoading}
        />
        <Text>Votre Séance</Text>
        <Scroll>
          {exercises.map((exercise, index) => {
            return (
              <View key={index}>
                <ExerciseTitle>{exercise?.title}</ExerciseTitle>
                <Button
                  title="+"
                  onPress={() => {
                    AddSerie(exercise.id);
                  }}
                />
                {exercise?.series?.map((serie, idx) => {
                  return (
                    <View key={serie.id}>
                      <FlexTwoColumn>
                        <FlexTextInput
                          onChangeText={text => {
                            modifyRepsOrWeigth(exercise?.id, serie?.id, {
                              reps: text,
                            });
                          }}
                          value={serie.reps}
                        />
                        <FlexTextInput
                          onChangeText={text => {
                            modifyRepsOrWeigth(exercise?.id, serie?.id, {
                              weight: text,
                            });
                          }}
                          value={serie.weight}
                        />
                      </FlexTwoColumn>
                      <Text>
                        {serie.reps} Répétitions à {serie.weight} Kg
                      </Text>
                      <Button
                        title="-"
                        onPress={() => {
                          RemoveSerie(exercise?.id, serie?.id);
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            );
          })}
        </Scroll>
        <View>
          <Text>
            Chronomètre: {chronometre.minutes}:{chronometre.seconds}
          </Text>
        </View>
        <Button
          title="Sauvegarder la séance"
          onPress={() => {
            storeSession();
          }}
        />
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

const Body = styled.View`
  margin: 0px 12px;
`;

const ExerciseTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const FlexTwoColumn = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const FlexTextInput = styled.TextInput`
  flex: 1;
  border: 1px solid black;
`;

const Scroll = styled.ScrollView`
  height: 400px;
`;

export default AddSession;
