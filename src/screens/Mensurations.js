import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import * as Styles from '../components/styled/Styled';
import {Picker} from '@react-native-picker/picker';

const Mensurations = () => {
  const [weight, setWeight] = React.useState();
  const [height, setHeight] = React.useState();
  const [age, setAge] = React.useState();
  const [sexe, setSexe] = React.useState(1);
  const [imc, setIMC] = React.useState();
  const [imcText, setImcText] = React.useState('Imc non Calculé');

  const CalculIMC = () => {
    let tempHeight = Number(height);
    if (height > 2) {
      tempHeight = tempHeight / 100;
    }
    // Calcul de l'IMC
    let imc = weight / (tempHeight * tempHeight);
    // Correction de l'IMC en fonction de l'âge
    if (age < 18) {
      imc = (imc * 10000) / (age + 1);
    } else if (age > 60) {
      imc = (imc * 10000) / (age + 1);
    }

    if (sexe === 0) {
      imc = imc * 0.9;
    } else if (sexe === 1) {
      imc = imc * 1.1;
    }

    let TempimcText = imcText;
    // Evaluation de l'IMC
    if (imc < 18.5) {
      TempimcText = 'sous-poids - Code promo : UBEREATS40';
    } else if (imc >= 18.5 && imc < 25) {
      TempimcText = 'poids normal';
    } else if (imc >= 25 && imc < 30) {
      TempimcText = 'surpoids';
    } else if (imc >= 30 && imc < 35) {
      TempimcText = 'obésité modérée';
    } else if (imc >= 35 && imc < 40) {
      TempimcText = 'obésité sévère';
    } else {
      TempimcText = 'obésité morbide';
    }

    setIMC(imc);
    setImcText(TempimcText);
    storeImc(imc, TempimcText);
  };

  useEffect(() => {
    getIMC();
  }, [getIMC]);

  const storeImc = useCallback(
    async (newImc, TempimcText) => {
      let imcObj = {
        imc: Number(newImc),
        imcText: TempimcText,
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
        sexe: Number(sexe),
      };
      try {
        await AsyncStorage.setItem('@IMC', JSON.stringify(imcObj));
      } catch (e) {
        console.log(e);
      }
    },
    [age, height, sexe, weight],
  );

  [1, 2];

  const getIMC = useCallback(async () => {
    let imcData = await AsyncStorage.getItem('@IMC');
    if (imcData) {
      imcData = JSON.parse(imcData);
      setAge(imcData?.age);
      setHeight(imcData?.height);
      if ([0, 1].includes(imcData?.sexe)) {
        setSexe(imcData?.sexe);
      } else {
        setSexe(1);
      }
      setWeight(imcData?.weight);
      setIMC(imcData?.imc);
      setImcText(imcData?.imcText);
    } else {
      console.log('Aucune valeur stockée');
    }
  }, []);

  return (
    <Styles.Body>
      <Title>Votre IMC</Title>

      <FormGroup>
        <Label>Poids: </Label>
        <Input
          onChangeText={setWeight}
          value={weight?.toString()}
          placeholder="70"
          keyboardType="numeric"
        />
      </FormGroup>
      <FormGroup>
        <Label>Taille: </Label>
        <Input
          onChangeText={setHeight}
          value={height?.toString()}
          placeholder="179"
          keyboardType="numeric"
        />
      </FormGroup>
      <FormGroup>
        <Label>Age: </Label>
        <Input
          onChangeText={setAge}
          value={age?.toString()}
          placeholder="20"
          keyboardType="numeric"
        />
      </FormGroup>
      <FormGroup>
        <Label>Sexe: </Label>
        <Picker
          style={{
            backgroundColor: '#f4f6f6',
            width: '50%',
          }}
          selectedValue={sexe}
          onValueChange={(itemValue, itemIndex) => setSexe(itemValue)}>
          <Picker.Item label="Homme" value="1" />
          <Picker.Item label="Femme" value="0" />
        </Picker>
      </FormGroup>
      <FormGroup>
        <Button
          onPress={() => {
            CalculIMC();
          }}>
          <ButtonText>Valider</ButtonText>
        </Button>
      </FormGroup>
      <Title>Votre I.M.C : {imc?.toFixed(2)}</Title>
      <Title>{imcText}</Title>
    </Styles.Body>
  );
};

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #000;
  margin-right: 15px;
`;

const Image = styled.Image`
  margin-top: 15px;
  width: 100px;
  height: 100px;
`;

const FormGroup = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`;

const Input = styled.TextInput`
  background-color: #f4f6f6;
  width: 50%;
  border-radius: 15px;
`;

const Button = styled.TouchableOpacity`
  background-color: #75a299;
  width: 50%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 14px;
`;
export default Mensurations;
