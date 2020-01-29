import React, { useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import Header from './Header';
import styled from 'styled-components'
import typeColors from '../TypeColors.js'

const axios = require('axios');


const Pic = styled.img`
  height: 34vh;
  width: auto;
  background-color: #CC0000;
  border: 0.4vh solid #FFDE00;
  border-radius: 4vh;
  margin: 4vh 4vw;
`
const ShinyPic = styled.img`
  height: 34vh;
  width: auto;
  background-color: #FFDE00;
  border: 0.4vh solid #CC0000;
  border-radius: 4vh;
  margin: 0 4vw;
`
const SmallEvolutionPic = styled.img`
  height: 10vh;
  width: auto;
  margin-top: -2.7vh;
`

const LargeEvolutionPic = styled.img`
  height: 21vh;
  width: auto;
  position: absolute
  margin: -4.5vh 0 0 3vw;
`

const Type = styled.div`
  background: #${props => typeColors.filter((color) => color.name === props.pokemonType)[0].hex};
  height: 7vh;
  width: 11vw;
  border-radius: 4vh;
  font-size: 5.5vh;
  color: white;
  -webkit-text-stroke: 0.1vh black;
  margin: 0 1vw 0 0;
  text-align: center;
`
const TypesContainer = styled.div`
  height: auto;
  width: 37vw;
  display: flex;
  flex-direction: row;
  margin: 4vh 0;
`

const InfoText = styled.div`
  height: 19vh;
  width: 34.6vw;
  text-align: left;
  font-size: 3.1vh;
  background-color: #EE8130;
  border: 0.4vh solid #FFDE00;
  border-radius: 4vh;
  padding: 2vh;
  margin-right: 4vw;
`
const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-aling: left;
  height: 29.8vh;
  width: 34.6vw;
  background-color: #EE8130;
  border: 0.4vh solid #FFDE00;
  border-radius: 4vh;
  padding: 2vh;
`

const StatsColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  text-aling: left;
  height: 25vh;
  width: 33vw;
  margin: 0.5vh 0.9vw 2vh 0.9vw;
  
`

const StatRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StatName = styled.p`
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.15vh #3B4CCA;
  font-size: 3vh
  margin: 1.2vh;
  line-height: 1.2em;
`
const StatValue = styled.div`
  font-size: 3vh
  margin: 1.2vh 2vw 1.2vh 0.5vw;
  background-color: #FFDE00;
  border: 0.15vw solid #3B4CCA;
  width: 3vw;
  height: auto;
`
const Heading = styled.h2`
  display: flex;
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.1vh #3B4CCA;
  font-size: 4vh
  margin: 1.2vh 10vw 0 1.5vw;
  line-height: 1.4em;
`
const EvolutionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-aling: left;
  height: 68.8vh;
  width: 21vw;
  background-color: #EE8130;
  border: 0.4vh solid #FFDE00;
  border-radius: 4vh;
  padding: 1.8vh;
  margin: 4vh 4vw 0 0;
`

const EvolutionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  text-aling: left;
  height: 64vh;
  width: 21vw;
`
const SmallEvolutionRow = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5.5vh;
  width: 13.5vw;
  margin: 0.7vh 0.5vw;
  background-color: #EE8130;
  border: 0.4vh solid #FFDE00;
  border-radius: 4vh;
  padding: 0 0 0 0.8vw;
  text-decoration: none;
  color: black;
`
const SmallEvolutionText = styled.p`
  font-size: 3.2vh
  margin: 0.6vh 0 0 0;
`

const LargeEvolutionText = styled.p`
  font-size: 3.8vh;
  color: #FFDE00;
  font-family: "Pokemon Solid";
  -webkit-text-stroke: 0.15vh #3B4CCA;
  line-height: 1.4em;
  position: absolute;
  margin-top: 10vh;
`


const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 19vh;
`

const PokemonDiv = styled.div`
  background-color: black;
  position: fixed;
  height: 100%
  width: 100%
`

const LargeEvolutionsColumn = styled(Link)`
  display: block;
  height: 14vh;
  width: 12vw;
  margin: 1.5vh 0.5vw 1.5vh 0;
  background-color: #EE8130;
  border: 0.4vh solid #FFDE00;
  border-radius: 4vh;
  padding: 1vw;
  text-decoration: none;
`

const FalvorText = ({pokemonInfo}) => {

  const infoText = pokemonInfo.flavor_text_entries.filter((entry) => entry.language.name === "en")[0].flavor_text

  return(
    <InfoText>{infoText}</InfoText>
  )
}

const PokemonType = ({pokemonVariantInfo}) => {

  return pokemonVariantInfo.types.map(type => {
   return <Type key={type.type.name} pokemonType={type.type.name}>{type.type.name}</Type>
  })

}

const Stats = ({pokemonVariantInfo}) => {

  return pokemonVariantInfo.stats.reverse().map(stat => {
    return <StatRow key={stat.stat.name}><StatName>{stat.stat.name}</StatName> <StatValue>{stat.base_stat}</StatValue></StatRow>
   })

}

const Evolutions = ({evolutionUrl}) => {
  const [ evolutionChain, setEvolutionChain ] = useState(null)
  var calc = 0

  useEffect(() => {
    axios({
        method: 'get',
        baseURL: evolutionUrl
      }) 
      .then(function(response) {
        setEvolutionChain(response.data.chain)
      })
      .catch(function(error) {
        console.log('There was an ERROR: ', error);
      });
  }, [])

  const calculateEvolutionChainLenght = (chain) => {
    calc++;
    console.log(calc)
    chain.evolves_to.map(calculateEvolutionChainLenght)
    return calc;
  }

  const renderLargeEvolutionChain = (chain) => {
    return (
      <div style={{marginLeft: "1.4vw"}} key={chain.species.name}>
        <SmallEvolutionRow to={`/pokemon/${chain.species.url.split('/').slice(-2, -1)}`}>
        <SmallEvolutionText>{chain.species.name}</SmallEvolutionText>
        <EvolutionPokemonPicture pictureType={'small'} pokemonApiUrl={chain.species.url}/>
        </SmallEvolutionRow>
        {chain.evolves_to.map(renderLargeEvolutionChain)}
      </div>
    )
  }

  const renderSmallEvolutionChain = (chain) => {
    return (
      <div style={{marginLeft: "1.6vw", textAlign: "left"}} key={chain.species.name}>
        <LargeEvolutionsColumn to={`/pokemon/${chain.species.url.split('/').slice(-2, -1)}`}>
        <EvolutionPokemonPicture pictureType={'large'} pokemonApiUrl={chain.species.url}/>
        <LargeEvolutionText>{chain.species.name}</LargeEvolutionText>
        </LargeEvolutionsColumn>
        {chain.evolves_to.map(renderSmallEvolutionChain)}
      </div>
    )
  }

  if(!evolutionChain) {
    return null;
  }
  else if (evolutionChain.evolves_to.length === 0) {
    return <div><br/><SmallEvolutionText style={{marginLeft: "1.6vw"}}>There are no evolutions.</SmallEvolutionText></div>
  }
  else if(calculateEvolutionChainLenght(evolutionChain) > 3) {
    return renderLargeEvolutionChain(evolutionChain);
  }
  else if (evolutionChain.evolves_to.length > 0){
    return renderSmallEvolutionChain(evolutionChain);
  }
  else return <p>There was an error.</p>



}

const EvolutionPokemonPicture = ({pictureType, pokemonApiUrl}) => {

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

    if(pictureType === 'small'){
      return (
        <SmallEvolutionPic src={pictureUrl} alt="" />
      )
    }
    else if(pictureType === 'large'){
      return(
        <LargeEvolutionPic src={pictureUrl} alt="" />
      )
    }
}

const PokemonInfos = ({pokemonInfo, pokemonVariantInfo}) => {
    return (
      <InfoContainer>
        <Column>
          <Row>
            <Pic src={pokemonVariantInfo.sprites.front_default} alt="" />
            <Column>
              <TypesContainer>
                <PokemonType pokemonVariantInfo={pokemonVariantInfo}/>
              </TypesContainer>
              <FalvorText pokemonInfo={pokemonInfo}/>
            </Column>
          </Row>
          <Row>
            <ShinyPic src={pokemonVariantInfo.sprites.front_shiny} alt="" />
            <StatsContainer>
            <Heading>Stats</Heading>
            <StatsColumn>
              <Stats pokemonVariantInfo={pokemonVariantInfo}/>
            </StatsColumn>
            </StatsContainer>
          </Row>
        </Column>
          <EvolutionsContainer>
            <Heading>Evolutions</Heading>
            <EvolutionsColumn>
              <Evolutions evolutionUrl={pokemonInfo.evolution_chain.url}/>
            </EvolutionsColumn>
          </EvolutionsContainer>
      </InfoContainer>
    )
}


const Pokemon = () => {

    const [ pokemonInfo, setPokemonInfo ] = useState(null)
    const [ pokemonVariantInfo, setPokemonVariantInfo ] = useState(null)
    const { pokemonId } = useParams();
    const lastLocation = useLastLocation();
  
    useEffect(() => {
        axios({
            method: 'get',
            baseURL: 'https://pokeapi.co/api/v2/pokemon-species/',
            url: pokemonId
          }) 
          .then(function(response) {
            setPokemonInfo(response.data)
            
            const variantUrl = response.data.varieties.filter((variant) => variant.is_default)[0].pokemon.url

            return(
              axios({
                method: 'get',
                url: variantUrl
              }) 
            )

          })
          .then(function(response) {
            setPokemonVariantInfo(response.data)
          })
          .catch(function(error) {
            console.log('There was an ERROR: ', error);
          });
    }, [pokemonId])

    if(!pokemonInfo || !pokemonVariantInfo) {
      return null;
    }

    
  
    return (
      <PokemonDiv>
        <Header
        title={pokemonInfo.name}
        leftButtonText="Back"
        leftButtonHref={lastLocation && !lastLocation.pathname.includes("/pokemon") ? lastLocation.pathname : "/"}
      />
      <PokemonInfos
        pokemonInfo={pokemonInfo}
        pokemonVariantInfo={pokemonVariantInfo}
      />
      </PokemonDiv>
    );
  }
  
  export default Pokemon