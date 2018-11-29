import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';
import DrizzleApp from './DrizzleApp';
import CreateAgreement from './CreateAreement';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        return 'Loading...';
      }
      return <CreateAgreement drizzle={drizzle} drizzleState={drizzleState} />;
    }}
  </DrizzleContext.Consumer>
);
