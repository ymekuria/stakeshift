import React, { Component } from 'react';
import { Button, Form, Input, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

class CreateAgreement extends Component {
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
        <div className="ui error message">{isError ? meta.error : ''}</div>
      </div>
    );
  };

  onSubmit = async ({ description, agreementAmount, sellerAddress }) => {
    const { drizzle, drizzleState } = this.props;

    const contract = drizzle.contracts.StakeShift;

    await contract.methods.createAgreement.cacheSend(
      description,
      sellerAddress,
      {
        from: drizzleState.accounts[0],
        value: agreementAmount
      }
    );
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
              name="description"
              component={this.renderInput}
              label="Description"
              placeholder="Add Description"
            />
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

const validate = ({ sellerAddress, agreementAmount }) => {
  const errors = {};
  const isValidAddress = !/^(0x)?[0-9a-f]{40}$/i.test(sellerAddress);

  if (!sellerAddress) {
    errors.sellerAddress = 'You must enter the sellers address';
  }

  if (sellerAddress && isValidAddress) {
    errors.sellerAddress = 'You must enter a valid seller address ';
  }

  if (!agreementAmount) {
    errors.agreementAmount = 'You must enter an amount';
  }
  if (/^\d+$/.test(agreementAmount) === false) {
    errors.agreementAmount = 'You must enter a number amount in wei';
  }

  return errors;
};

export default reduxForm({
  form: 'createAgreement',
  validate
})(CreateAgreement);
