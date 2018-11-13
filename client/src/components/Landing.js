import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';
import DrizzleApp from './DrizzleApp';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      console.log(' drizzleContext', drizzleContext);
      if (!initialized) {
        return 'Loading...';
      }
      return <DrizzleApp drizzle={drizzle} drizzleState={drizzleState} />;
      return <DrizzleApp />;
    }}
  </DrizzleContext.Consumer>
);
