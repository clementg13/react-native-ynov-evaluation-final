import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const LongCardTitleAndImage = props => {
  const navigation = useNavigation();

  return (
    <Card
      onPress={() => {
        console.log(props.NavigationRoute);
        console.log(props.NavigationRouteParams);
        if (props.NavigationRoute) {
          return navigation.navigate(props.NavigationRoute);
        } else if (props.NavigationRouteParams) {
          return navigation.navigate(
            props.NavigationRouteParams[0],
            props.NavigationRouteParams[1],
          );
        }
      }}>
      <View>
        <Title>{props.Title}</Title>
      </View>
      <View>
        {props.Image ? (
          <Image
            widthHeight={props.width}
            marginTop={props.ImagemarginTop}
            source={props.Image}
          />
        ) : null}
      </View>
    </Card>
  );
};

const Card = styled.TouchableOpacity`
  background-color: #f4f6f6;
  padding: 10px 20px;
  width: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 25px;
  color: black;
  max-width: 200px;
`;

const Image = styled.Image`
  margin-top: ${props => {
    return props.marginTop ? `${props.marginTop}px` : '-30px';
  }};
  width: ${props => {
    return props.widthHeight ? `${props.widthHeight}px` : '90px';
  }};
  height: ${props => {
    return props.widthHeight ? `${props.widthHeight}px` : '90px';
  }};
`;

export default LongCardTitleAndImage;
