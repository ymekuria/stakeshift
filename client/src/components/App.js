import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { LoadingContainer } from 'drizzle-react-components';
import Header from './Header';
import Landing from './Landing';
import CreateAgreement from './CreateAreement';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/create" component={CreateAgreement} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
