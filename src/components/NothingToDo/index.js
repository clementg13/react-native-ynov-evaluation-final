import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 40px;
`;

const Text = styled.Text`
  padding: 40px;
`;

const Image = styled.Image`
  width: 100px;
  height: 100px;
`;

const NothingToDo = () => {
  return (
    <Container>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2914/2914120.png',
        }}
      />
      <Text>Rien à faire...😎</Text>
    </Container>
  );
};

export default NothingToDo;
