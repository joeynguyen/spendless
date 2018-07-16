import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Popconfirm, message } from 'antd';
import ReactFileReader from 'react-file-reader';
import parseCSV from '../utils/csvParser.js';
import * as transactionsActions from './TransactionsActions.js';

class FileUpload extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    activeMonth: PropTypes.string.isRequired,
    uploadedTransactionsExist: PropTypes.bool.isRequired,
  };
  state = {
    uploadedFile: '',
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.uploadedTransactionsExist !==
        this.props.uploadedTransactionsExist &&
      nextProps.uploadedTransactionsExist === false
    ) {
      this.setState({ uploadedFile: '' });
    }
  }
  handleFile = files => {
    // TODO: Fix not being able to upload same file twice in a row if canceled first time
    if (files[0]) {
      parseCSV(files[0], this.props.accountId, this.props.activeMonth)
        .then(val => {
          this.setState({ uploadedFile: files[0].name });
          this.props.actions.addUploadedTransactions(val);
        })
        .catch(err => {
          message.error(err);
        });
    }
  };
  removeUploadedFile = () => {
    this.setState({ uploadedFile: '' });
    this.props.actions.resetUploadedTransactions();
  };
  render() {
    const uploadedFileContent = this.state.uploadedFile ? (
      <div
        className="ant-upload-list-item ant-upload-list-item-done"
        style={{ marginTop: 0 }}
      >
        <div className="ant-upload-list-item-info">
          <i className="anticon anticon-paper-clip" />
          <span className="ant-upload-list-item-name">
            {this.state.uploadedFile}
          </span>
        </div>
        <Popconfirm
          onConfirm={this.removeUploadedFile}
          title="Remove this file and its transactions？"
          okText="Yes"
          cancelText="No"
        >
          <i title="Remove file" className="anticon anticon-cross" />
        </Popconfirm>
      </div>
    ) : null;
    return (
      <form encType="multipart/form-data" style={{ display: 'inline-block' }}>
        {/* inline-block prevents file input clickable window from extending across screen */}
        <ReactFileReader handleFiles={this.handleFile} fileTypes=".csv">
          <Button size="large" icon="upload">
            Upload Transactions
          </Button>
        </ReactFileReader>
        {uploadedFileContent}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMonth: state.activeMonth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUpload);
