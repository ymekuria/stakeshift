import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

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
      <form style={styles.formStyle} onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Seller Address"
          value={sellerAddress}
          onChange={e => {
            this.setState({ sellerAddress: e.target.value });
            console.log('state', this.state);
          }}
        />
        <input
          type="text"
          placeholder="Amount in Wei"
          value={amount}
          onChange={e => this.setState({ amount: e.target.value })}
        />
        <Button>Create</Button>
      </form>
    );
  }
}

const styles = {
  formStyle: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default CreateAgreement;
