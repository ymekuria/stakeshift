import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Segment, Icon } from 'semantic-ui-react';
import { setCurrentUser } from '../actions';
import withDrizzle from '../utils/withDrizzle';
import ApprovalDisplay from './ApprovalDisplay';

class Agreements extends Component {
  state = { dataKey: null };

  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;

    // connects drizzle to watch for changes on agreements method on smart contract and add to drizzleState
    const dataKey = await drizzle.contracts.StakeShift.methods.agreements.cacheCall(
      drizzleState.accounts[0]
    );

    this.setState({ dataKey });
  }

  renderAgreements = () => {
    const {
      descriptionStyle,
      amountContainerStyle,
      amountDisplayStyle
    } = styles;

    const currentUserAddress = this.props.drizzleState.accounts[0];

    const { StakeShift } = this.props.drizzleState.contracts;
    // use the dataKey to get contract state from Drizzle
    const agreements = StakeShift.agreements[this.state.dataKey];
    if (agreements) {
      const { description, amount } = agreements.value;

      this.props.setCurrentUser(
        currentUserAddress,
        agreements.value,
        this.props.history
      );

      return (
        <Segment raised>
          <Segment>
            <Segment basic>
              <div style={descriptionStyle}>{description}</div>
              <div style={amountContainerStyle}>
                <div style={amountDisplayStyle}>
                  <Icon color="yellow" size="large" name="ethereum" />
                </div>

                <div style={amountDisplayStyle}>{`${amount}  ETH`}</div>
              </div>
            </Segment>

            <Segment basic>
              <ApprovalDisplay />
            </Segment>
          </Segment>
        </Segment>
      );
    }
  };
  render() {
    return <Segment.Group>{this.renderAgreements()}</Segment.Group>;
  }
}

const styles = {
  descriptionStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '2em 1em',
    fontSize: '1.6em'
  },
  amountContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  amountDisplayStyle: { padding: '.5em', fontSize: '1.6em' }
};
export default connect(
  null,
  { setCurrentUser }
)(withDrizzle(withRouter(Agreements)));
