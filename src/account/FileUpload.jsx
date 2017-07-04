import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import ReactFileReader from 'react-file-reader';
import parseCSV from '../utils/csvParser.js';
import * as transactionsActions from './TransactionsActions.js';

class FileUpload extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  }
  state = {
    uploadedFile: '',
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.accountId !== this.props.accountId) {
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
  render() {
    const uploadedFileContent = this.state.uploadedFile ?
      (
        <div style={{ position: 'relative' }}>
          <div className="ant-upload-list-item-info">
            <i className="anticon anticon-paper-clip"></i>
            <span className="ant-upload-list-item-name">{this.state.uploadedFile}</span>
          </div>
        </div>
      )
      : null
    ;
    return (
      <form encType="multipart/form-data">
        <ReactFileReader handleFiles={this.handleFile} fileTypes=".csv">
          <Button size="large" icon="upload">Click to Upload</Button>
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
