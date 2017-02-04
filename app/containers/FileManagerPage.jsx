import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions/index';
import adb from '../utils/adb';
import AppBar from 'material-ui/AppBar';
import NavLeft from 'material-ui/svg-icons/navigation/chevron-left';
import {goBack, push} from 'react-router-redux';
import _ from 'lodash';
import HeaderIcons from '../components/Header/FileManagerButtons';
import Table from '../components/FileManager/Table';
import path from 'path';

const styles = {
  navLeftButton: {
    height: '30px',
    width: '30px',
    padding: '8px 2px',
    cursor: 'pointer'
  }
};

class FileManagerPage extends Component {

  componentDidMount() {
    this.loadFilesOfDirectory();
  }
  loadFilesOfDirectory(directory) {
    const vm = this;
    const currentDirectory = directory;
    adb.getFileList(_.result(vm.props.state.devices, 'selectedDevice.serial') || '', currentDirectory).then((fileList) => {
      vm.props.actions.changeFileManagerPath(currentDirectory, fileList);
    }).catch((er) => console.log('err', er));
  }
  getNextPath(current, next) {
    return path.join(current, next);
  }
  render() {
    const vm = this;
    const selectedDeviceName = _.result(vm.props.state.devices, 'selectedDevice.device.properties["ro.product.model"]') || vm.props.state.devices.selectedDevice.serial;
    return (
      <div>
        <AppBar title={`File Manager (${selectedDeviceName})`} iconElementRight={< HeaderIcons onRefreshClick = {
          () => vm.loadFilesOfDirectory(vm.props.state.filemanager.currentPath)
        } />} iconElementLeft={< NavLeft style = {
          styles.navLeftButton
        }
        onClick = {
          () => vm.props.navigateBack()
        } > </NavLeft>}></AppBar>
        <Table onRowClick={(rowData) => {
          if (rowData.type === 'DIRECTORY' || rowData.type === 'SYMLINK') {
            vm.loadFilesOfDirectory(vm.getNextPath(vm.props.state.filemanager.currentPath, rowData.name+'/'));
          }
        }} currentPath={vm.props.state.filemanager.currentPath} fileList={vm.props.state.filemanager.fileList}></Table>
      </div>
    );
  }
}

FileManagerPage.propTypes = {
  state: React.PropTypes.object,
  actions: React.PropTypes.object
};

let mapStateToProps = (state) => {
  return {state: state};
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    navigateBack: () => dispatch(goBack()),
    navigate: (route) => dispatch(push(route))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileManagerPage);
