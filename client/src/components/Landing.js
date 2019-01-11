import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';
import CreateAgreement from './CreateAreement';
import Loading from './Loading';

export default () => {
  return (
    <DrizzleContext.Consumer>
      {drizzleContext => {
        const { drizzle, drizzleState, initialized } = drizzleContext;

        if (!initialized) {
          return <Loading />;
        }
        return (
          <CreateAgreement drizzle={drizzle} drizzleState={drizzleState} />
        );
      }}
    </DrizzleContext.Consumer>
  );
};
