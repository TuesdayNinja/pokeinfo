import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from './Header';
import Filters from './Filters';
import styled from 'styled-components'

const axios = require('axios');

const LeftButton = styled(Link)`
  opacity: ${props => {
    if(props.pokemonsShown === 0)return 0.5;
    else return 1;
  }};
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.3vh #3B4CCA;
  font-size: 3.5vw;
  text-decoration: none;
  background-color: #CC0000;
  border: 0.6vh solid #FFDE00;
  position: fixed;
  right: 82vw;
  top: 18.7vh;
  left: 0;
  bottom: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2em;
`
const RightButton = styled(Link)`
  opacity: ${props => {
    if(props.filteredPokemons.length < props.pokemonsShown + 9)return 0.5;
    else return 1;
  }};
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.3vh #3B4CCA;
  font-size: 3.5vw;
  text-decoration: none;
  background-color: #CC0000;
  border: 0.6vh solid #FFDE00;
  position: fixed;
  left: 82vw;
  top: 18.7vh;
  right: 0;
  bottom: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2em;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20.5vh
  width: 50vw;
  height: auto;
  position: absolute;
  left: 25vw
  flex-wrap: wrap;

`

const PokemonButton = styled(Link)`
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.3vh #3B4CCA;
  font-size: 3.5vh;
  text-decoration: none;
  background-color: #CC0000;
  border: 0.6vh solid #FFDE00;
  width: 23vh;
  height: 23vh;
  border-radius: 100%;
  margin: 1vh;
  flex-direction: column;
  display: flex;
  line-height: 1.2em;
  
`

const Pic = styled.img`
  height: 30vh;
  width: auto;
`

const ButtonText = styled.p`
  
  bottom: 0%;
  width: auto;
  margin: 0;
  margin-top: -20%;
  white-space: nowrap;
`

const PokedexDiv = styled.div`
  background-color: black;
  position: absolute;
  height: 100%
  width: 100%
`


const PokemonPicture = ({pokemonApiUrl}) => {

  const [ pictureUrl, setPictureUrl ] = useState("")

  useEffect(() => {
    axios({
      method: 'get',
      url: pokemonApiUrl
    }) 
    .then(function(response) {

      const variantUrl = response.data.varieties.filter((variant) => variant.is_default)[0].pokemon.url
      
      return(
        axios({
        method: 'get',
        url: variantUrl
      }) 
      )
    })
    .then(function(response) {
       setPictureUrl(response.data.sprites.front_default);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
  }, [])


    return (
      <Pic src={pictureUrl} alt="" />
    )
}

const PokemonNames = ({pokemons, pokemonsShown}) => {

  let subset = pokemons.slice(pokemonsShown, pokemonsShown+9)

  return(
    subset.map(pokemon =>
    <PokemonButton 
      key={pokemon.entry_number} 
      to={`/pokemon/${pokemon.pokemon_species.url.split('/').slice(-2, -1)}`}
      num={pokemon.entry_number}
    >
      <PokemonPicture pokemonApiUrl={pokemon.pokemon_species.url}/>
      <ButtonText>#{pokemon.entry_number} {pokemon.pokemon_species.name}</ButtonText>
    </PokemonButton>
    )
  )
}





const Pokedex = () => {

  const [ pokemons, setPokemons ] = useState([]);
  const [ filteredPokemons, setFilteredPokemons ] = useState([]);
  const [ pokedexName, setPokedexName ] = useState("");
  const [ showFilters, setShowFilters] = useState(false);
  const { pokedexId } = useParams();
  const pokemonsShown = parseInt(useParams().pokemonsShown);
  

  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'https://pokeapi.co/api/v2/pokedex/',
      url: pokedexId
    }) 
    .then(function(response) {
      setPokemons(response.data.pokemon_entries)
      setFilteredPokemons(response.data.pokemon_entries)
      setPokedexName(response.data.name)

    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
  }, [])

  const handleNextClick = () => {
    if(filteredPokemons.length > pokemonsShown + 9){
      return `${pokemonsShown + 9}`
    }
  }

  const handlePreviousClick = () => {
    if(pokemonsShown > 0){
      return `${pokemonsShown - 9}`
    }
  }

  const handleShowFilters = () => setShowFilters(true);

  return (
    <PokedexDiv>
      <Filters 
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        pokemons={pokemons}
        filteredPokemons={filteredPokemons}
        setFilteredPokemons={setFilteredPokemons}
      />
      <Header
        title={pokedexName}
        leftButtonText="Exit"
        leftButtonHref={pokedexId == 1 ? "/" : "/choosePokedex"}
        rightButtonText="Filters/ Sort"
        handleRightButtonClick={() => handleShowFilters()}
      />
      <LeftButton 
        to={handlePreviousClick}
        pokemonsShown={pokemonsShown}>
        Previous
      </LeftButton>
      <RightButton 
        pokemonsShown={pokemonsShown} 
        filteredPokemons={filteredPokemons}
        to={handleNextClick}>
        Next
      </RightButton>
      <Wrapper>
      <PokemonNames 
        pokemons={filteredPokemons}
        pokemonsShown={pokemonsShown}
      />
      </Wrapper>
      
      
    </PokedexDiv>
  );
}

export default Pokedex