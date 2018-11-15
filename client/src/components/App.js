import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';
import Header from './Header';
import Landing from './Landing';
import drizzleOptions from '../utils/drizzleOptions';

class App extends Component {
  render() {
    return (
       
      <BrowserRouter>
        <div>
          <DrizzleContext.Provider drizzle={drizzleOptions}> 
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
          </DrizzleContext.Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
