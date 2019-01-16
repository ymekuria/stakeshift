import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

export default () => {
  return (
    <div>
      <Dimmer active>
        <Loader indeterminat="true" inline="centered" size="huge">
          Syncing With the Ethereum Blockchain
        </Loader>
      </Dimmer>
    </div>
  );
};
