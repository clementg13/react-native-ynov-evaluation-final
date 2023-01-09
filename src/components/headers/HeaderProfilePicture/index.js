import React from 'react';
import styled from 'styled-components';
import memoji1 from '../../../assets/images/memoji1.png';
import memoji2 from '../../../assets/images/memoji2.png';
import memoji3 from '../../../assets/images/memoji3.png';

let memoji = [memoji1, memoji2, memoji3];
memoji = memoji[Math.floor(Math.random() * 3)];

const HeaderProfilePicture = () => {
  return (
    <Container>
      <Image source={memoji} />
    </Container>
  );
};

const Container = styled.View`
  margin: 10px 0;
  background-color: #e3e9f5;
  border-radius: 100px;
`;
const Image = styled.Image`
  width: 60px;
  height: 60px;
`;

export default HeaderProfilePicture;
