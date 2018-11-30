import React, { Component } from 'react';
import { Button, Form, Input, Message, Card, Segment } from 'semantic-ui-react';

class CreateAgreement extends Component {
  state = {
    sellerAddress: '',
    amount: '',
    stakeId: null
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.StakeShift;
    // const stackId = contract.methods.createAgreement.cacheSend(2, {
    //   from: contract.accounts[0]
    // });
    // this.setState({ stackId });
    // const stackId = drizzle.contracts.SimpleStorage.methods.set.cacheSend(2, { from: '0x3f...' })

    console.log('drizzle in App', drizzle);
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
        <Form size="big" centered>
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
