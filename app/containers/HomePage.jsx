import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DeviceList from '../components/DeviceList/DeviceList';
import * as actions from '../redux/actions/index';
import adb from '../utils/adb';
import AppBar from 'material-ui/AppBar';
import {push} from 'react-router-redux';
import HeaderIcons from '../components/Header/HomeButtons';

class HomePage extends Component {

  registerAutoUpdate = () => {
    console.log('this.props.state.settings.refreshDelay', this.props.state.settings.refreshDelay);
    this.intervalHolder = setInterval(() => {
      this.listDevices();
    }, this.props.state.settings.refreshDelay);
  }
  cancelAutoUpdate = () => {
    clearInterval(this.intervalHolder);
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
    this.registerAutoUpdate();
  }
  componentWillUnmount() {
    this.cancelAutoUpdate();
  }
  render() {
    const vm = this;
    return (
      <div>
        <AppBar title="Detected devices" onTitleTouchTap={() => vm.listDevices()} iconStyleLeft={{
          display: 'none'
        }} iconElementRight={< HeaderIcons onRefreshClick = {
          () => vm.listDevices()
        }
        onToggleClick = {
          (evt, value) => {
            (value)
              ? this.registerAutoUpdate()
              : this.cancelAutoUpdate();
          }
        }
        toggleDefault = {
          this.props.state.settings.refreshToggleDefault
        } > </HeaderIcons>}></AppBar>
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
  return {state: state};
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    navigate: (route) => dispatch(push(route))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
