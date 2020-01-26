import React from 'react';
import { LastLocationProvider } from 'react-router-last-location'
import './App.css';
import Home from './components/Home.js'
import Pokedex from './components/Pokedex.js'
import ChoosePokedex from './components/ChoosePokedex.js'
import Pokemon from './components/Pokemon.js'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


const App = () => {


  return (
    <div>
      <Router>
        <LastLocationProvider>
          <div>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/pokedex/:pokedexId" render={() => <Pokedex />} />
            <Route path="/choosepokedex" render={() => <ChoosePokedex />} />
            <Route path="/pokemon/:pokemonId" render={() => <Pokemon />} />
          </div>
        </LastLocationProvider>
      </Router>
    </div>
  )
}


export default App;
