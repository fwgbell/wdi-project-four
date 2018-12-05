import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './scss/style.scss';
import 'bulma';

import Header from './components/Header';
import Home from './components/Home';
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';
import PitchIndex from './components/pitches/Index';
import PitchShow from './components/pitches/Show';
import PitchNew from './components/pitches/New';
import PitchEdit from './components/pitches/Edit';

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
              <Route path='/pitches/:id/edit' component={PitchEdit}/>
              <Route path='/pitches/:id' component={PitchShow}/>
              <Route path="/login" component={AuthLogin} />
              <Route path="/register" component={AuthRegister} />
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
