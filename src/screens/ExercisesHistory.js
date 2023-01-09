import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';

export default function ExercicesHistory() {
  const [sessions, setSessions] = React.useState([]);
  const getSessions = useCallback(async () => {
    let AsyncSessions = await AsyncStorage.getItem('@Sessions');
    if (AsyncSessions) {
      AsyncSessions = JSON.parse(AsyncSessions);
      setSessions(AsyncSessions);
    } else {
      console.log('Aucune valeur stockée');
    }
  }, []);

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  return (
    <Scroll>
      <Title>Historique De Séances</Title>
      {sessions.map((session, index) => {
        let time = session.find(x => x?.id === 'chronometre');
        let tempSession = session.filter(obj => obj.id !== 'chronometre');
        return (
          <Session key={index}>
            <Text>
              Temps: {time.minutes}:{time.seconds}min
            </Text>
            {tempSession.map((exercise, idx) => {
              console.log('aie', exercise);
              return (
                <Exercice key={idx}>
                  <Text>{exercise.title} :</Text>
                  {exercise.series.map((serie, i) => {
                    return (
                      <Exercice key={i}>
                        <Text>{serie.reps} Répétitions</Text>
                        <Text>{serie.weight} Kg</Text>
                      </Exercice>
                    );
                  })}
                </Exercice>
              );
            })}
          </Session>
        );
      })}
    </Scroll>
  );
}

let Scroll = styled.ScrollView`
  padding: 5px;
  height: 400px;
`;

let Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

let Text = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

let Session = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
`;

let Exercice = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px;
`;
