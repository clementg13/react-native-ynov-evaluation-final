import {Text} from 'react-native';
import React from 'react';
import styled from 'styled-components';

const date = new Date();

const HeaderTitleCustom = props => {
  return (
    <Container>
      <Title>{props.Title}</Title>
      <Text style={{textAlign: 'right'}}>{date.toLocaleDateString('fr')}</Text>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 10px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  text-align: right;
`;

export default HeaderTitleCustom;
