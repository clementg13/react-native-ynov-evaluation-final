import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components';

const Exercise = ({route}) => {
  const exerciseInfo = route.params;

  return (
    <Body>
      <View>
        <StyleText text={exerciseInfo?.nom} />
        <Image source={exerciseInfo?.img ? {uri: exerciseInfo?.img} : null} />
        <StyleText text={exerciseInfo?.description} fontSize="16px" />
        <Description>
          Equipement(s):
          {(() => {
            if (Array.isArray(exerciseInfo?.equipement)) {
              let equipementsArray = [];
              exerciseInfo?.equipement?.map((element, index) => {
                equipementsArray.push(
                  <Element key={index}> {String(element)} </Element>,
                );
              });
              return equipementsArray;
            } else {
              return <Element> Aucune équipement renseigné </Element>;
            }
          })()}
        </Description>
        <Description>
          Cibles:
          {(() => {
            if (Array.isArray(exerciseInfo?.cible)) {
              let ciblesArray = [];
              exerciseInfo?.cible?.map((element, index) => {
                ciblesArray.push(
                  <Element key={index}> {String(element)} </Element>,
                );
              });
              return ciblesArray;
            } else {
              return <Element> Aucune cibles renseigné </Element>;
            }
          })()}
        </Description>
        <Description>Description: {exerciseInfo?.description}</Description>
      </View>
    </Body>
  );
};

const Body = styled.View`
  margin: 0px 12px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const Element = styled.Text`
  background-color: #154c79;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
  margin-left: 5px;
  margin-left: 5px;
`;

const Image = styled.Image`
  margin-top: 15px;
  width: 300px;
  height: 300px;
`;

const Description = styled.Text`
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
  color: #000;
`;

const StyleText = styled.Text`
  font-size: ${props => {
    return props.fontSize ? props.fontSize : '20px';
  }};
  font-weight: ${props => {
    return props.fontWeight ? props.fontWeight : 'bold';
  }};
  color: ${props => {
    return props.fontColor ? props.fontColor : 'black';
  }};
`;

export default Exercise;
