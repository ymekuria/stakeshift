import React from 'react';
import { DrizzleContext } from 'drizzle-react';

export default Component => {
  return props => (
    <DrizzleContext.Consumer>
      {drizzleContext => {
        const { drizzle, drizzleState, initialized } = drizzleContext;
        if (!initialized) {
          // TODO: create loading Component
          return 'Loading Page...';
        }

        return (
          <Component {...props} drizzle={drizzle} drizzleState={drizzleState} />
        );
      }}
    </DrizzleContext.Consumer>
  );
};
