import React, { Component, PropTypes } from 'react';
import EditAccountFormContainer from './EditAccountFormContainer.js';
import { Well, Collapse } from 'react-bootstrap';

export default class AccountsListItem extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
  }
  state = {
    settingsVisible: false,
  }
  toggleSettings = () => {
    this.setState({ settingsVisible: !this.state.settingsVisible });
  }
  render() {
    const styles = {
      removeIcon: {
        cursor: 'pointer',
      }
    };
    const formInitialValues = {
      initialValues: {
        accountName: this.props.account.name,
        accountType: this.props.account.type,
        accountCompany: this.props.account.company,
      }
    };

    return (
      <Well bsSize="small" key={this.props.account._id}>
        <i className="fa fa-lg fa-fw fa-cog pull-right" style={styles.removeIcon} onClick={this.toggleSettings} ></i>
        <h4>{this.props.account.name}</h4>
        <p>{this.props.account.type === 'bank' ? 'Bank' : 'Credit Card'} - {this.props.account.company}</p>
        <Collapse in={this.state.settingsVisible}>
          <div>
            <EditAccountFormContainer
              {...formInitialValues}
              account={this.props.account}
              formKey={this.props.account._id}
              toggleSettings={this.toggleSettings}
            />
          </div>
        </Collapse>
      </Well>
    );
  }
}
