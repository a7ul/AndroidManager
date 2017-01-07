import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DeviceList from '../components/DeviceList/DeviceList';
import * as actions from '../redux/actions/index';
import adb from '../utils/adb';

class HomePage extends Component {
  updateDevices() {
    adb.listDevices().then(devices => this.props.actions.updateDevices(devices)).catch(err => console.log(err));
  }
  componentDidMount(){
    this.updateDevices();
  }
  render() {
    return (
      <div>
        {/*<Test content={this.props.state.sample.payload} onClick={this.props.actions.sampleAction}/>*/}
        <DeviceList devices={this.props.state.devices.devicesList}></DeviceList>
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
