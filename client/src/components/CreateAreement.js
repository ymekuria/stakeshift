import React, { Component } from 'react';
import { Button, Form, Input, Message, Card, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

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
  renderInput = ({ input, label, placeholder, meta }) => {
    const isError = meta.touched && meta.error;
    return (
      <div>
        <Input
          className={`field ${isError ? 'error' : ''}`}
          {...input}
          label={label}
          labelPosition="right"
          placeholder={placeholder}
          autoComplete="off"
        />
        <i className="ui error message">{isError ? meta.error : ''}</i>
      </div>
    );
  };

  onSubmit = formValues => {
    console.log('formValues', formValues);
  };

  render() {
    return (
      <Segment raised padded="very">
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          size="big"
          error
        >
          <Form.Field>
            <Field
              name="sellerAddress"
              component={this.renderInput}
              label="Seller Address"
              placeholder="0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413"
            />
          </Form.Field>
          <Form.Field>
            <Field
              name="agreementAmount"
              component={this.renderInput}
              label="Wei"
              labelPosition="right"
              placeholder="10000000"
            />
          </Form.Field>
          <Form.Field>
            <Button primary icon="add circle" content="Create" />
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.sellerAddress) {
    errors.sellerAddress = 'You must enter the sellers address';
  }

  if (
    formValues.sellerAddress &&
    formValues.sellerAddress.toString().length !== 42
  ) {
    errors.sellerAddress = 'You must enter a valid seller address';
  }
  if (
    formValues.sellerAddress &&
    formValues.sellerAddress.toString().slice(0, 2) !== '0x'
  ) {
    errors.sellerAddress = 'You must enter a valid seller address';
  }

  if (!formValues.agreementAmount) {
    errors.agreementAmount = 'You must enter an amount';
  }
  if (/^\d+$/.test(formValues.agreementAmount) === false) {
    errors.agreementAmount = 'You must enter an number amount in wei';
  }

  return errors;
};

export default reduxForm({
  form: 'createAgreement',
  validate
})(CreateAgreement);
