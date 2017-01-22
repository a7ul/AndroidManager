import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeviceList from '../components/DeviceList/DeviceList';
import * as actions from '../redux/actions/index';
import adb from '../utils/adb';
import AppBar from 'material-ui/AppBar';
import { push } from 'react-router-redux';
import result from 'lodash/result';
import HeaderIcons from '../components/Header/Buttons';

class HomePage extends Component {
  autoRefresh = () => {
    if (result(this.props.state, 'devices.devicesList', []).length === 0) {
      this.listDevices();
    }
  }
  listDevices() {
    const vm = this;
    adb.listDevices().then(devices => {
      vm.props.actions.updateDevices(devices);
      devices.forEach((eachDevice) => {
        adb.getDeviceProperties(eachDevice.serial).then((deviceProperties) => {
          vm.props.actions.updateDeviceProperties(eachDevice.serial, deviceProperties);
        }).catch(err => {
          console.log(err);
          vm.props.actions.updateDeviceProperties(eachDevice.serial, {});
        });
      });
    }).catch(err => console.log(err));
  }
  onDeviceSelect(device) {
    const vm = this;
    vm.props.actions.selectDevice(device.serial, device);
    vm.props.navigate('/file-manager');
  }
  componentDidMount() {
    this.listDevices();
    setInterval(this.autoRefresh, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.autoRefresh);
  }
  render() {
    const vm = this;
    return (
      <div>
        <AppBar title="Detected devices" onTitleTouchTap={() => vm.listDevices()} iconStyleLeft={{
        display: 'none'
      }}
      iconElementRight={<HeaderIcons onRefreshClick={() => vm.listDevices()}/>}/>
        <DeviceList onDeviceClick={(device) => vm.onDeviceSelect(device)} selectedDevice={vm.props.state.devices.selectedDevice} devices={vm.props.state.devices.devicesList}></DeviceList>
      </div>
      );
  }
}

HomePage.propTypes = {
  state: React.PropTypes.object,
  actions: React.PropTypes.object
};

let mapStateToProps = (state) => {
  return {
    state: state
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    navigate: (route) => dispatch(push(route))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
