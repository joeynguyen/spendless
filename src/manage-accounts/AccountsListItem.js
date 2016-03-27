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
    let editAccountForm;
    if (this.state.settingsVisible) {
      const formInitialValues = {
        initialValues: {
          accountName: this.props.account.name,
          accountType: this.props.account.type,
          accountCompany: this.props.account.company,
        }
      };
      // adding EditAccount form this way so that the component will mount and
      // unmount, resetting the form fields in doing so
      // also, this speeds up loading the modal because redux-form isn't initialized
      // for every account form on load. Only initializes when account is toggled
      editAccountForm = (
                        <EditAccountFormContainer
                          {...formInitialValues}
                          account={this.props.account}
                          formKey={this.props.account._id}
                          toggleSettings={this.toggleSettings}
                        />
                        );
    }

    return (
      <Well bsSize="small" key={this.props.account._id}>
        <i className="fa fa-lg fa-fw fa-cog pull-right" style={styles.removeIcon} onClick={this.toggleSettings} ></i>
        <h4>{this.props.account.name}</h4>
        <p>{this.props.account.type === 'bank' ? 'Bank' : 'Credit Card'} - {this.props.account.company}</p>
        <Collapse in={this.state.settingsVisible}>
          <div>
            { editAccountForm }
          </div>
        </Collapse>
      </Well>
    );
  }
}
