import React from 'react';
import styled from 'styled-components'

const ModalWrapper = styled.div`
  position: fixed;
  top: 3vh;
  bottom: 11vh;
  left: 7vw;
  right: 7vw; 
  background-color: black;
  border: 0.6vh solid #FFDE00;
  border-radius: 4vh;
  z-index: 1;
  box-shadow:
  0 0.3vh 0.2vh rgba(0, 0, 0, 0.034),
  0 0.5vh 0.4vh rgba(0, 0, 0, 0.048),
  0 1.1vh 1vh rgba(0, 0, 0, 0.06),
  0 1.7vh 1.5vh rgba(0, 0, 0, 0.072),
  0 2.5vh 2vh rgba(0, 0, 0, 0.086),
  0 5vh 4vh rgba(0, 0, 0, 0.12)
`
const Title = styled.h1`
    color: #FFDE00;
    font-family: "Pokemon Solid";
    -webkit-text-stroke: 0.4vh #3B4CCA;
    font-weight: normal;
    font-size: 8vh;
    text-decoration: none;
    text-aling: center;
    margin: 1.5vh;
    margin-bottom: 0.2vh;
    line-height: 1.2em;
`

const PlaceHolder = styled.div`
    height: 10vh;
    width: 13vw;
    margin: 2vh 3vw 0 3vw;
`


const Button = styled.button`
    color: #FFDE00;
    font-family: "Pokemon Solid";
    -webkit-text-stroke: 0.3vh #3B4CCA;
    font-size: 7vh;
    text-decoration: none;
    background-color: transparent;
    border: none;
    line-height: 1.2em;

`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #CC0000;
    border-bottom: 0.6vh solid #FFDE00;
    border-radius: 3vh 3vh 0 0;
`


const LeftButton = ({leftButtonText, handleLeftButtonClick}) => {
    if(leftButtonText !== undefined || handleLeftButtonClick !== undefined){
        return(
            <Button onClick={handleLeftButtonClick}>{leftButtonText}</Button>
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


const ModalHeader = ({title, leftButtonText, handleLeftButtonClick, rightButtonText, handleRightButtonClick}) => {

    return (
      <Wrapper>
        <PlaceHolder>
            <LeftButton 
                leftButtonText={leftButtonText}
                handleLeftButtonClick={handleLeftButtonClick}
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

const Modal = ({showFilters, setShowFilters, title, rightButtonText, handleRightButtonClick, children}) => {

const handleClose = () => setShowFilters(false);
  
  if (!showFilters) {
    return null;
  }
  else {return (
    <>
      <ModalWrapper show={showFilters} onClose={handleClose}>
        <ModalHeader
            title={title}
            leftButtonText="Close"
            handleLeftButtonClick={handleClose}
            rightButtonText={rightButtonText}
            handleRightButtonClick={handleRightButtonClick}
        />
        {children}
      </ModalWrapper>
    </>
  )};

  }
  
  export default Modal