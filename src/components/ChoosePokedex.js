import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import tail from 'lodash/tail';
import Header from './Header';
import styled from 'styled-components'

const axios = require('axios');

const Button = styled(Link)`
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.3vh #3B4CCA;
  font-size: 5.3vh;
  text-decoration: none;
  background-color: #CC0000;
  border: 0.6vh solid #FFDE00;
  width: 23vh;
  height: 23vh;
  border-radius: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1vh 3vh;
  line-height: 1.4em;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vh 7vh;
  flex-wrap: wrap;
  margin-top: 20.5vh;
`

const ChoosePokedexDiv = styled.div`
  background-color: black;
  position: absolute;
  height: 100%
  width: 100%
`


const PokedexLink = ({num, name}) => <Button to={`pokedex/${num}/0`}>{name}</Button>

const RenderLinks = ({pokedexes}) => {
  let subset = tail(pokedexes)

  return (
   subset.map(pokedex => 
    <PokedexLink key={pokedex.name} num={pokedex.url.split('/').slice(-2, -1)} name={pokedex.name} />
    )
  )
}

const ChoosePokedex = () => {
  const [ pokedexes, setPokemdexes ] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'https://pokeapi.co/api/v2/pokedex/'
    }) 
    .then(function(response) {
      setPokemdexes(response.data.results)

    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
  }, [])


  return (
    <ChoosePokedexDiv>
      <Header
        title="Pokedexes"
        leftButtonText="Exit"
        leftButtonHref="/"
      />
      <Wrapper>
      <RenderLinks pokedexes={pokedexes}/>
      </Wrapper>
    </ChoosePokedexDiv>
  );
}

export default ChoosePokedex;