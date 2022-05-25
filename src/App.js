import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Settings from './pages/Settings';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Game } />
      </Switch>
    </div>
  );
}
