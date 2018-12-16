import React, { Component } from 'react';
import { Button, Form, Input, Message, Card, Segment } from 'semantic-ui-react';

class CreateAgreement extends Component {
  state = {
    sellerAddress: '',
    amount: '',
    stakeId: null
  };

  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.StakeShift;

    const stackId = await contract.methods.createAgreement.cacheSend(
      'First Agreement',
      '0x14723a09acff6d2a60dcdf7aa4aff308fddc160c',
      {
        from: '0x79F9Bb6AbF20Df043a7cC0Ed2b299D06C08b0a6A'
      }
    );
    this.setState({ stackId });
    console.log('stackID', stackId);
    if (this.props.drizzleState.transactionStack[stackId]) {
      const txHash = this.props.drizzleState.transactionStack[stackId];

      console.log('tx', this.props.drizzleState.transactions[txHash].status);
    }
    // const stackId = drizzle.contracts.SimpleStorage.methods.set.cacheSend(2, { from: '0x3f...' })

    console.log('drizzleState', drizzleState.transactionStack[stackId]);
  }
  handleInput = event => {
    event.preventDefault();
    this.setState.sellerAddress = event.value;
  };

  onSubmit = event => {
    event.preventDefault();
    // drizzle actions etc
    console.table(this.state);
  };

  render() {
    const { sellerAddress, amount } = this.state;

    return (
      <Segment raised padded="very">
        <Form size="big">
          <Form.Field>
            <Input
              label="Seller Address"
              labelPosition="right"
              placeholder="0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413"
            />
          </Form.Field>
          <Form.Field>
            <Input label="Wei" labelPosition="right" placeholder="10000000" />
          </Form.Field>
          <Message
            error
            header="Action Forbidden"
            content="You can only sign up for an account once with a given e-mail address."
          />
          <Form.Field>
            <Button primary icon="add circle" content="Create" />
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default CreateAgreement;
