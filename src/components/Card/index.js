import React, {Component} from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const Card = props => {
  const navigation = useNavigation();
  return (
    <CardTouchable
      customHeight={props?.customHeight}
      backgroundColor={props.backgroundColor}
      onPress={() => navigation.navigate(props.NavigationRoute)}>
      <CardImageBackground
        backgroundColor={props.backgroundImageColor}
        customHeight={props?.customImageHeight}
        customWidth={props?.customImageWidth}>
        <CardImage
          source={props.cardImage}
          customHeight={props?.customImageHeight}
          customWidth={props?.customImageWidth}
        />
      </CardImageBackground>
      <CardTitle>{props.Title}</CardTitle>
    </CardTouchable>
  );
};

const CardTouchable = styled.TouchableOpacity`
  background-color: ${props => props.backgroundColor};
  width: 100%;
  height: ${props =>
    props.customHeight ? `${props.customHeight}px` : '120px'};
  margin-top: 12px;
  margin-bottom: 3px;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const CardImageBackground = styled.View`
  background-color: ${props => props.backgroundColor};
  width: ${props => (props.customWidth ? `${props.customWidth}px` : '70px')};
  height: ${props => (props.customHeight ? `${props.customHeight}px` : '70px')};
  border-radius: 100px;
`;

const CardImage = styled.Image`
  width: ${props => (props.customWidth ? `${props.customWidth}px` : '70px')};
  height: ${props => (props.customHeight ? `${props.customHeight}px` : '70px')};
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

export default Card;
