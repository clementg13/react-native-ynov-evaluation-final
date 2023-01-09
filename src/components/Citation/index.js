import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Citation = () => {
  const [Data, setData] = useState([]);
  const [Text, setText] = useState({
    text: 'La citation arrive...',
    author: 'MyFitBook',
  });
  useEffect(() => {
    axios
      .get('https://type.fit/api/quotes')
      .then(res => {
        console.log('res.data');
        setData(res.data);
        let response = res.data[Math.floor(Math.random() * 1640)];
        setText({text: response.text, author: response.author});
      })
      .catch(err => {
        console.log(err);
        setText({text: "Une erreur c'est produite", author: 'MyFitBook'});
      });
  }, []);

  function updateCitation() {
    let updatedCitation = Data[Math.floor(Math.random() * 1640)];
    setText({text: updatedCitation.text, author: updatedCitation.author});
  }
  return (
    <CitationContainer
      onPress={() => {
        updateCitation();
      }}>
      <CitationText>
        "{Text.text}" - <CitationAuthor>{Text.author}</CitationAuthor>
      </CitationText>
    </CitationContainer>
  );
};

const CitationContainer = styled.TouchableOpacity`
  background-color: #ffedd0;
  border-radius: 5px;
  min-height: 100px;
  padding: 20px;
  transition: 1s ease-in-out;
`;

const CitationText = styled.Text`
  color: black;
  font-size: 17px;
  transition: 1s ease-in-out;
`;

const CitationAuthor = styled.Text`
  color: grey;
  font-size: 15px;
  font-style: italic;
  transition: 1s ease-in-out;
`;

export default Citation;
