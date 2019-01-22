import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Landing from './Landing';
import CreateAgreement from './CreateAreement';
import Agreements from './Agreements';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/create" component={CreateAgreement} />
              <Route exact path="/agreements" component={Agreements} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
