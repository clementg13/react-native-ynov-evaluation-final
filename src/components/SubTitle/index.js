import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components';

const SubTitle = props => {
  return (
    <View>
      <Title>{props.Title}</Title>
    </View>
  );
};

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: black;
`;

export default SubTitle;
