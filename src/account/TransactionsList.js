import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAccountTransactions, resetAccountTransactions } from './TransactionsActions.js';
import TransactionsItem from './TransactionsItem.js';
import Table from 'react-toolbox/lib/table';

const UserModel = {
  name: {type: String},
  twitter: {type: String},
  birthdate: {type: Date},
  cats: {type: Number},
  dogs: {type: Number},
  active: {type: Boolean}
};

const users = [
  {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
  {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
];

class TransactionsList extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doFetchAccountTransactions: PropTypes.func.isRequired,
    doResetAccountTransactions: PropTypes.func.isRequired,
  }
  state = { selected: [], source: users }
  handleChange = (row, key, value) => {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }
  handleSelect = (selected) => {
    this.setState({selected});
  }
  componentWillMount() {
    this.props.doFetchAccountTransactions(this.props.accountId);
  }
  componentDidUpdate(prevProps) {
    // console.log('prevProps.accountId', prevProps.accountId);
    // console.log('this.props.accountId', this.props.accountId);
    if (this.props.accountId !== prevProps.accountId) {
      this.props.doFetchAccountTransactions(this.props.accountId);
    }
  }
  componentWillUnmount() {
    this.props.doResetAccountTransactions();
  }

  render() {
    // console.log('accountTransactions', this.props.accountTransactions);
    return (
      <div>
      <Table
        model={UserModel}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        selectable
        selected={this.state.selected}
        source={this.state.source}
      />
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.uploadedTransactions.map(itemData =>
              <TransactionsItem key={itemData._id} item={itemData} unsaved={true} />
            )
          }
          {
            this.props.accountTransactions.map(itemData =>
              <TransactionsItem key={itemData._id} item={itemData} unsaved={false} />
            )
          }
        </tbody>
      </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountTransactions: state.accountTransactions,
    uploadedTransactions: state.uploadedTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doFetchAccountTransactions: fetchAccountTransactions,
    doResetAccountTransactions: resetAccountTransactions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
