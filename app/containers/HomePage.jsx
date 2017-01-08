import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DeviceList from '../components/DeviceList/DeviceList';
import * as actions from '../redux/actions/index';
import adb from '../utils/adb';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

class HomePage extends Component {
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
    vm.props.actions.selectDevice(device.serial);
  }
  componentDidMount() {
    this.listDevices();
  }
  render() {
    const vm = this;
    return (
      <div>
        <AppBar
            title="Detected devices"
            onTitleTouchTap={()=>vm.listDevices()}
            iconElementRight={<FlatButton label="refresh" onClick={()=>vm.listDevices()} />}
          />
        <Divider />
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
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
