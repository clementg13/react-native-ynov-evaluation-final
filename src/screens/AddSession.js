import {View, Text, TextInput, Button} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';

const AddSession = () => {
  const [data, setData] = React.useState(null);
  const [exercises, setExercises] = React.useState([]);
  const [chronometre, setChronometre] = React.useState({
    minutes: 0,
    seconds: 0,
  });
  const refDropDownController = useRef(null);
  const [dropdownLoading, setDropdownLoading] = React.useState(true);

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
          return {minutes: prevChronometre.minutes + 1, seconds: 0};
        }
        return {
          minutes: prevChronometre.minutes,
          seconds: prevChronometre.seconds + 1,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
                <Text>{exercise?.title}</Text>
                <Button
                  title="+"
                  onPress={() => {
                    AddSerie(exercise.id);
                  }}
                />
                {exercise?.series?.map((serie, idx) => {
                  return (
                    <View key={serie.id}>
                      <TextInput
                        onChangeText={text => {
                          modifyRepsOrWeigth(exercise?.id, serie?.id, {
                            reps: text,
                          });
                        }}
                        value={serie.reps}
                      />
                      <TextInput
                        onChangeText={text => {
                          modifyRepsOrWeigth(exercise?.id, serie?.id, {
                            weight: text,
                          });
                        }}
                        value={serie.weight}
                      />
                      <Text>
                        {serie.reps} {serie.weight}
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

const Scroll = styled.ScrollView`
  height: 400px;
`;

export default AddSession;
