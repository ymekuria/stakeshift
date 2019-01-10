import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import drizzle from './drizzleOptions';

export default Component => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
      if (!initialized) {
        // TODO: create loading Component
        return 'Loading...';
      }

      return (
        <Component
          drizzle={drizzle}
          drizzleState={drizzleState}
          initialized={initialized}
        />
      );
    }}
  </DrizzleContext.Consumer>
);
