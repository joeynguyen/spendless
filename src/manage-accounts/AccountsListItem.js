import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { Well, Collapse, Input } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchAccounts } from './AccountsActions.js';

class AccountsListItem extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
  }
  state = {
    settingsVisible: false,
  }
  toggleSettings = () => {
    this.setState({ settingsVisible: !this.state.settingsVisible });
    console.log('settingsVisible', this.state.settingsVisible);
    console.log('props', this.props);
  }

  render() {
    const styles = {
      removeIcon: {
        cursor: 'pointer',
      }
    };
    const { fields: { accountName, accountType, accountCompany },  } = this.props;

    return (
      <Well bsSize="small" key={this.props.account._id}>
        <i className="fa fa-lg fa-fw fa-cog pull-right" style={styles.removeIcon} onClick={this.toggleSettings} ></i>
        <h4>{this.props.account.name}</h4>
        <p>{this.props.account.type === 'bank' ? 'Bank' : 'Credit Card'} - {this.props.account.company}</p>
        <Collapse in={this.state.settingsVisible}>
          <div>
            <form>
              <Input
                type="text"
                label="Name"
                {...accountName}
              />
              <Input
                type="select"
                label="Type"
                {...accountType}
              >
                <option value="">select...</option>
                <option value="bank">Bank</option>
                <option value="creditcard">Credit Card</option>
              </Input>
              <Collapse in={accountType.value === 'bank'}>
                <div>
                  <Input
                    type="text"
                    label="Name of Institution"
                    {...accountCompany}
                  />
                </div>
              </Collapse>
              <Collapse in={accountType.value === 'creditcard'}>
                <div>
                  <Input
                    type="select"
                    label="Credit Card Company"
                    {...accountCompany}
                  >
                    <option value="">select...</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">Mastercard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                    <option value="Diners Club">Diners Club</option>
                    <option value="JCB">JCB</option>
                    <option value="Other">Other</option>
                  </Input>
                </div>
              </Collapse>

            </form>
          </div>
        </Collapse>
      </Well>
    );
  }
}

export default reduxForm(
  {
    form: 'accountInfo',
    fields: ['accountName', 'accountType', 'accountCompany'],
  }
)(AccountsListItem);
