import React, { useState, useEffect} from 'react';
import Modal from './Modal';
import styled from 'styled-components'
import typeColors from '../TypeColors.js'
import { Link } from 'react-router-dom';

const axios = require('axios');


const TypeSelector = styled(Link)`
  background: #${props => typeColors.filter((color) => color.name === props.type)[0].hex};
  height: 8vh;
  width: 13vw;
  border-radius: 4vh;
  font-size: 6vh;
  color: white;
  -webkit-text-stroke: 0.1vh black;
  margin: 1.5vh;
  text-align: center;
  text-decoration: none;
`

const TypesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 65vw;
  margin: 1vw;
`
const TypesColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 65vw;
  height: 70vh;
  justify-content: space-between;
  border-left: 0.2vw solid #FFDE00;
  margin: 0.7vh;
  padding-left: 2vw;
`

const SortsColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 16vw;
  height: 22vh;
  margin: 10px;
  justify-content: space-between;
`

const Heading = styled.h2`
  display: flex;
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.1vh #3B4CCA;
  font-size: 5vh
  margin: 3vh 0 0 5vh;
`
const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const SortsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3vh 2vh 7vh 3.5vh ;
`

const SortButton = styled(Link)`
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.15vw #3B4CCA;
  font-size: 2.6vw;
  text-decoration: none;
  background-color: #CC0000;
  border: 0.3vh solid #FFDE00;
  width: 12.5vw;
  height: 15vh;
  border-radius: 4vh;
  margin-bottom: 6vh;
  text-align: center;
`


  
  const Types = ({types, pokemons, setFilteredPokemons, setShowFilters}) => {
    return types.map( type => {
      if(type.name==="unknown" || type.name==="shadow"){
          return null;
      }
      else{
        return <SortByType 
                    key={type.name}
                    typeUrl={type.url} 
                    typeName={type.name} 
                    pokemons={pokemons} 
                    setFilteredPokemons={setFilteredPokemons}
                    setShowFilters={setShowFilters}
                />
      }
    })
  }
  
  const SortByType = ({typeUrl, typeName, pokemons, setFilteredPokemons, setShowFilters}) => {

    const [ typesPokemons, setTypesPokemons ] = useState(null)
    
    useEffect(() => {
      axios({
        method: 'get',
        url: typeUrl
      }) 
      .then(function(response) {
        setTypesPokemons(response.data.pokemon);
      })
      .catch(function(error) {
        console.log('There was an ERROR: ', error);
      });
    }, [typeName])

    const handleTypeClick = () => {
        if (typesPokemons === null){
          return null
        }
        setFilteredPokemons(pokemons.filter(pokemon => typesPokemons.find(typesPokemon => typesPokemon.pokemon.name === pokemon.pokemon_species.name)));
        setShowFilters(false);
        
    }

    return <TypeSelector type={typeName} onClick={handleTypeClick} to={'0'}>{typeName}</TypeSelector>
  }

 

  const SortByNumber = ({filteredPokemons, setFilteredPokemons, setShowFilters}) => {

    if (filteredPokemons === null){
      return null
    }

    const handleSortByNumber = () => {
      let sortPokemons = filteredPokemons.slice();
      sortPokemons.sort((a, b) => {
         return a.entry_number - b.entry_number
      });
      if(JSON.stringify(sortPokemons)===JSON.stringify(filteredPokemons)){
        sortPokemons.sort((a, b) => {
          return b.entry_number - a.entry_number
       });
      }
      setFilteredPokemons(sortPokemons)
      setShowFilters(false)
    }

    return <SortButton onClick={handleSortByNumber} to={'0'}>Number</SortButton>
  };
  
  const SortByAlphabet = ({filteredPokemons, setFilteredPokemons, setShowFilters}) => {
    if (filteredPokemons === null){
      return null
    }

    const handleSortByAlphabet = () => {
      let sortPokemons = filteredPokemons.slice();
      sortPokemons.sort((a, b) => {
        if (a.pokemon_species.name < b.pokemon_species.name) return -1 
        if (a.pokemon_species.name > b.pokemon_species.name) return 1
        else return 0
      });
      if(JSON.stringify(sortPokemons)===JSON.stringify(filteredPokemons)){
        sortPokemons.sort((a, b) => {
          if (a.pokemon_species.name > b.pokemon_species.name) return -1 
          if (a.pokemon_species.name < b.pokemon_species.name) return 1
          else return 0
        });
       };
      setFilteredPokemons(sortPokemons)
      setShowFilters(false)
    }
    return <SortButton onClick={handleSortByAlphabet} to={'0'}>Alphabet</SortButton>
  }

 

  const Filters = ({showFilters, setShowFilters, pokemons, filteredPokemons, setFilteredPokemons}) => {

    const [ types, setTypes ] = useState(null)
    
    useEffect(() => {
      axios({
        method: 'get',
        url: 'https://pokeapi.co/api/v2/type'
      }) 
      .then(function(response) {
        setTypes(response.data.results);
      })
      .catch(function(error) {
        console.log('There was an ERROR: ', error);
      });
    }, [])
  
    const handleReset = () => {
      setFilteredPokemons(pokemons)
      setShowFilters(false)
    }

    return(
      <Modal 
        showFilters={showFilters} 
        setShowFilters={setShowFilters}
        title="Filters"
        rightButtonText="Reset"
        handleRightButtonClick={() => handleReset()}
        rightTo={'0'}
      >
        <FiltersWrapper>
          <SortsColumn>
            <Heading>Sort by</Heading>
            <SortsWrapper>
              <SortByNumber
                filteredPokemons={filteredPokemons}
                setFilteredPokemons={setFilteredPokemons}
                setShowFilters={setShowFilters}
              />
              <SortByAlphabet
                filteredPokemons={filteredPokemons}
                setFilteredPokemons={setFilteredPokemons}
                setShowFilters={setShowFilters}
              />
            </SortsWrapper>
          </SortsColumn>
          <TypesColumn>
          <Heading>Filter by type</Heading>
            <TypesWrapper>
              <Types 
                types={types} 
                pokemons={pokemons}
                setFilteredPokemons={setFilteredPokemons}
                setShowFilters={setShowFilters}
              />
            </TypesWrapper>
          </TypesColumn>
        </FiltersWrapper>
      </Modal>
    )
  }

  export default Filters