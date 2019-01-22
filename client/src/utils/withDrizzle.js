import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import Loading from '../components/Loading';

export default Component => {
  return props => (
    <DrizzleContext.Consumer>
      {drizzleContext => {
        const { drizzle, drizzleState, initialized } = drizzleContext;
        if (!initialized) {
          return <Loading />;
        }

        return (
          <Component {...props} drizzle={drizzle} drizzleState={drizzleState} />
        );
      }}
    </DrizzleContext.Consumer>
  );
};
