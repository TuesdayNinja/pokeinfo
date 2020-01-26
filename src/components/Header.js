import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Title = styled.h1`
    color: #FFDE00;
    font-family: "Pokemon Solid";
    -webkit-text-stroke: 0.6vh #3B4CCA;
    font-weight: normal;
    font-size: 12vh;
    text-decoration: none;
    text-aling: center;
    margin: 1.5vh;
    margin-bottom: 0;
    line-height: 1.4em;
`

const PlaceHolder = styled.div`
    height: 16vh;
    width: 32vh;
    margin: 2vh 2vh 0 2vh;
    text-align: center;
`

const LeftLink = styled(Link)`
    color: #FFDE00;
    font-family: "Pokemon Solid";
    -webkit-text-stroke: 0.3vh #3B4CCA;
    font-size: 10vh;
    text-decoration: none;
    line-height: 1.4em;
`

const Button = styled.button`
    color: #FFDE00;
    font-family: "Pokemon Solid";
    -webkit-text-stroke: 0.25vh #3B4CCA;
    font-size: 5.4vh;
    text-decoration: none;
    background-color: #CC0000;
    border: none;
    line-height: 1.4em;

`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #CC0000;
    border-bottom: 0.8vh solid #FFDE00;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80.6vh;
`



const LeftButton = ({leftButtonText, leftButtonHref}) => {
    if(leftButtonText !== undefined || leftButtonHref !== undefined){
        return(
            <LeftLink to={`${leftButtonHref}`} >{leftButtonText}</LeftLink>
        )
    }
    else return null;
}

const RightButton = ({rightButtonText, handleRightButtonClick}) => {
    if(rightButtonText !== undefined || handleRightButtonClick !== undefined){
        return(
            <Button onClick={handleRightButtonClick}>{rightButtonText}</Button>
        )
    }
    else return null;
}


const Header = ({title, leftButtonText, leftButtonHref, rightButtonText, handleRightButtonClick}) => {

    return (
      <Wrapper>
        <PlaceHolder>
            <LeftButton 
                leftButtonText={leftButtonText}
                leftButtonHref={leftButtonHref}
            />
        </PlaceHolder>
        <Title>{title}</Title>
        <PlaceHolder>
            <RightButton
                rightButtonText={rightButtonText}
                handleRightButtonClick={handleRightButtonClick}
            />
        </PlaceHolder>
      </Wrapper>
    )
  }
  
  
  export default Header;
  