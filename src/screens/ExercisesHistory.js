import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect} from 'react';

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
    <View>
      <Text>Historique De Séances</Text>
      {sessions.map((session, index) => {
        console.log(session);
        return (
          <View key={index}>
            {session.map((exercise, idx) => {
              return (
                <View key={idx}>
                  <Text>{exercise.title}</Text>
                  {exercise.series.map((serie, i) => {
                    return (
                      <View key={i}>
                        <Text>{serie.reps} Répétitions</Text>
                        <Text>{serie.weight} Kg</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
