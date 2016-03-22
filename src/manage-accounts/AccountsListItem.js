import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Well, Collapse, Input, Button, Alert } from 'react-bootstrap';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class AccountsListItem extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
  }
  state = {
    settingsVisible: false,
    alertVisible: false,
    confirmDeleteVisible: false,
    confirmDeleteText: '',
  }
  handleAlertDismiss = () => {
    this.setState({alertVisible: false});
  }
  handleAlertShow = () => {
    this.setState({alertVisible: true});
  }

  render() {
    const styles = {
      removeIcon: {
        cursor: 'pointer',
      }
    };
    const { fields: { accountName, accountType, accountCompany }, resetForm } = this.props;

    const toggleSettings = () => {
      if (this.state.settingsVisible) {
        resetForm();
      }
      this.setState({ settingsVisible: !this.state.settingsVisible });
    };
    const toggleConfirmDelete = () => {
      this.setState({ confirmDeleteVisible: !this.state.confirmDeleteVisible });
    };
    const handleConfirmDeleteText = (e) => {
      this.setState({ confirmDeleteText: e.target.value });
    };
    const handleUpdateAccount = (accountToUpdate) => {
      const self = this;
      const newAccountObj = Object.assign({}, accountToUpdate, {
        name: this.props.fields.accountName.value,
        type: this.props.fields.accountType.value,
        company: this.props.fields.accountCompany.value,
      });
      // Update account in DB
      db.put(newAccountObj).then(function(result) {
        console.log('Successfully updated account', result);
        self.handleAlertShow();
      }).catch(function(err) {
        console.log(err);
        // TODO: Add error message after update fail
      });
    };
    const handleDeleteAccount = (accountToDelete) => {
      // Remove account from DB
      db.remove(accountToDelete).then(function(result) {
        console.log('Successfully deleted account', result);
        // TODO: Add success message after successful delete
      }).catch(function(err) {
        console.log('Error trying to delete account', err);
        // TODO: Add error message after delete fail
      });
    };
    let alertMessage;

    if (this.state.alertVisible) {
      alertMessage = (
        <div>
          <br />
          <Alert bsStyle="success" onDismiss={this.handleAlertDismiss} dismissAfter={2000}>
            <p>Account updated successfully!</p>
          </Alert>
        </div>
      );
    }

    return (
      <Well bsSize="small" key={this.props.account._id}>
        <i className="fa fa-lg fa-fw fa-cog pull-right" style={styles.removeIcon} onClick={toggleSettings} ></i>
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
              <Button
                disabled={this.props.pristine}
                onClick={() => handleUpdateAccount(this.props.account)}
                bsStyle="success"
              >Update</Button>
              {' '}
              <Button
                onClick={toggleSettings}
              >Cancel</Button>
              <Button
                className="pull-right"
                disabled={this.state.confirmDeleteVisible}
                onClick={toggleConfirmDelete}
                bsStyle="danger"
              >Delete</Button>
              <div className="clearfix"></div>
              <Collapse in={this.state.confirmDeleteVisible}>
                <div>
                  <hr />
                  <p>Type DELETE into this box to confirm</p>
                  <div className="row">
                    <div className="col-xs-6">
                      <Input
                        type="text"
                        value={this.state.confirmDeleteText}
                        onChange={handleConfirmDeleteText}
                        placeholder="DELETE" />
                    </div>
                    <div className="col-xs-6">
                      <Button
                        disabled={this.state.confirmDeleteText !== 'DELETE'}
                        onClick={() => handleDeleteAccount(this.props.account)}
                        bsStyle="success"
                      >Confirm</Button>
                      {' '}
                      <Button
                        onClick={toggleConfirmDelete}
                      >Cancel</Button>
                    </div>
                  </div>
                </div>
              </Collapse>
            </form>
            { alertMessage }
          </div>
        </Collapse>
      </Well>
    );
  }
}

export default reduxForm(
  {
    form: 'EditAccount',
    fields: ['accountName', 'accountType', 'accountCompany'],
  },
)(AccountsListItem);
