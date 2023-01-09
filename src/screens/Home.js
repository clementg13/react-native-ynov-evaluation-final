import {ScrollView} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import * as Styles from '../components/styled/Styled';
import workoutImage from '../assets/images/bench-press.png';
import mensurationImage from '../assets/images/metre.png';
import workoutMenImage from '../assets/images/workoutMen.png';
import defiImage from '../assets/images/objectif.png';
import planningImage from '../assets/images/calendrier.png';
import workoutStuffs from '../assets/images/workout-stuffs.png';
import LongCardTitleAndImage from '../components/LongCardTitleAndImage';
import SubTitle from '../components/SubTitle';
import Card from '../components/Card';
import Citation from '../components/Citation';

const LongCardWithImage = [
  {
    title: 'Créer ton \nProgramme',
    image: workoutImage,
    navigationRoute: 'AddSession',
  },
  {
    title: 'Vos \nMensurations',
    image: mensurationImage,
    navigationRoute: 'Mensurations',
    width: 60,
  },
];
const Home = () => {
  return (
    <Styles.Body>
      <ScrollView
        contentContainerStyle={{paddingBottom: 70}}
        showsVerticalScrollIndicator={false}>
        <TopSpacedContainer>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 12, paddingBottom: 12}}
            horizontal={true}>
            {LongCardWithImage.map((element, i) => {
              return (
                <LongCardContainer
                  key={i}
                  marginLeft={i > 0 ? true : false}
                  marginRight={LongCardWithImage.length == i ? true : false}>
                  <LongCardTitleAndImage
                    Title={element.title}
                    Image={element.image}
                    NavigationRoute={element.navigationRoute}
                    width={element?.width}
                    marginTop={element?.marginTop}
                  />
                </LongCardContainer>
              );
            })}
          </ScrollView>
        </TopSpacedContainer>
        <TopSpacedContainer marginTop={40}>
          <SubTitle Title="Catégories" />
          <CardContainer>
            <SubCardContainer marginRight={true}>
              <Card
                customHeight={200}
                backgroundColor="#fcf1fa"
                NavigationRoute="Mensurations"
                backgroundImageColor="#f6dddf"
                cardImage={workoutMenImage}
                Title="Historique d'Exercices"
              />
              <Card
                backgroundColor="#f4f6f6"
                NavigationRoute="Mensurations"
                customImageHeight="40"
                customImageWidth="40"
                backgroundImageColor="#dadada"
                cardImage={planningImage}
                Title="Votre Planning"
              />
            </SubCardContainer>
            <SubCardContainer>
              <Card
                backgroundColor="#e4f3e2"
                NavigationRoute="Mensurations"
                customImageHeight="40"
                customImageWidth="40"
                backgroundImageColor="#cfecc9"
                cardImage={defiImage}
                Title="Vos Défis"
              />
              <Card
                customHeight={200}
                backgroundColor="#edf8fd"
                NavigationRoute="Exercices"
                backgroundImageColor="#d2e9f2"
                cardImage={workoutStuffs}
                Title="Liste d'Exercices"
              />
            </SubCardContainer>
          </CardContainer>
        </TopSpacedContainer>
        <TopSpacedContainer>
          <Citation />
        </TopSpacedContainer>
      </ScrollView>
    </Styles.Body>
  );
};

const LongCardContainer = styled.View`
  margin-left: ${props => {
    return props.marginLeft ? '12px' : '0';
  }};
  margin-right: ${props => {
    return props.marginRight ? '12px' : '0';
  }};
`;

const TopSpacedContainer = styled.View`
  margin-top: ${props => (props.margintop ? props.margintop : '20px')};
`;

const CardContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SubCardContainer = styled.View`
  width: 48%;
  display: flex;
  flex-direction: column-reverse;
  margin-right: ${props => (props.marginRight ? '12px' : '0')};
`;

export default Home;
