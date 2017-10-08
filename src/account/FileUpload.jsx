import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Popconfirm } from 'antd';
import ReactFileReader from 'react-file-reader';
import parseCSV from '../utils/csvParser.js';
import * as transactionsActions from './TransactionsActions.js';

class FileUpload extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    uploadedTransactionsExist: PropTypes.bool.isRequired,
  }
  state = {
    uploadedFile: '',
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uploadedTransactionsExist !== this.props.uploadedTransactionsExist
      && nextProps.uploadedTransactionsExist === false
    ) {
      this.setState({ uploadedFile: '' });
    }
  }
  handleFile = (files) => {
    if (files[0]) {
      const newTransactions = parseCSV(files[0], this.props.accountId);
      newTransactions.then(val => {
        this.setState({ uploadedFile: files[0].name });
        this.props.actions.addUploadedTransactions(val);
      });
    }
  }
  removeUploadedFile = () => {
    this.setState({ uploadedFile: '' });
    this.props.actions.resetUploadedTransactions();
  }
  render() {
    const uploadedFileContent = this.state.uploadedFile ?
      (
        <div className="ant-upload-list-item ant-upload-list-item-done" style={{ marginTop: 0 }}>
          <div className="ant-upload-list-item-info">
            <i className="anticon anticon-paper-clip"></i>
            <span className="ant-upload-list-item-name">{this.state.uploadedFile}</span>
          </div>
          <Popconfirm
            onConfirm={this.removeUploadedFile}
            title="Remove this file and its transactions？"
            okText="Yes"
            cancelText="No"
          >
            <i title="Remove file" className="anticon anticon-cross"></i>
          </Popconfirm>
        </div>
      )
      : null
    ;
    return (
      <form encType="multipart/form-data" style={{ display: 'inline-block' }}>
        {/* inline-block prevents file input clickable window from extending across screen */}
        <ReactFileReader handleFiles={this.handleFile} fileTypes=".csv">
          <Button size="large" icon="upload">Upload Transactions</Button>
        </ReactFileReader>
        { uploadedFileContent }
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(FileUpload);
