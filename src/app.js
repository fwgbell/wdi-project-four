import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bulma';
import './scss/style.scss';

import Header from './components/Header';
import Home from './components/Home';
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';
import PitchIndex from './components/pitches/Index';
import PitchShow from './components/pitches/Show';
import MatchesNew from './components/matches/New';
import MatchesEdit from './components/matches/Edit';
import MatchesShow from './components/matches/Show';
import PitchNew from './components/pitches/New';
import PitchEdit from './components/pitches/Edit';
import PitchMap from './components/pitches/PitchesMap';
import Profile from './components/user/Profile';
import Messages from './components/messages/Main';
import FindPlayers from './components/user/FindPlayers';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <main className="container">
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/pitches' component={PitchIndex} />
              <Route exact path='/pitches/new' component={PitchNew} />
              <Route exact path='/pitches/map' component={PitchMap}/>
              <Route path='/pitches/:id/edit' component={PitchEdit}/>
              <Route path='/pitches/:id' component={PitchShow}/>
              <Route path='/matches/new' component={MatchesNew}/>
              <Route path='/matches/:id/edit' component={MatchesEdit}/>
              <Route path='/matches/:id' component={MatchesShow}/>
              <Route path="/profile/:id" component={Profile} />
              <Route exact path='/messages' component={Messages}/>
              <Route exact path='/find' component={FindPlayers}/>
              <Route exact path="/login" component={AuthLogin} />
              <Route exact path="/register" component={AuthRegister} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
