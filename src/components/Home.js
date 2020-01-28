import React from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import styled from 'styled-components'

const Button = styled(Link)`
    color: #FFDE00;
    font-family: "Pokemon Solid";
    -webkit-text-stroke: 0.3vh #3B4CCA;
    font-size: 4vw;
    text-decoration: none;
    background-color: #CC0000;
    border: none;
    border: 0.5vh solid #FFDE00;
    height: 66vh;
    width: 23vw;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.4em;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 26vh 21vw 0 21vw;
`

const HomeDiv = styled.div`
  background-color: black;
  position: absolute;
  height: 100%
  width: 100%
`

const Home = () => {

  return (
    <HomeDiv>
      <Header
        title="Pokeinfo"
      />
      <Wrapper>
      <Button to="/pokedex/1/0">National pokedex</Button>
      <Button to="/choosepokedex">Choose pokedex</Button>
      </Wrapper>
    </HomeDiv>
  );
}

export default Home;
