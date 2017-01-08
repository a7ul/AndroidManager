import React, {Component} from 'react';
import style from './DeviceList.style';
import Paper from 'material-ui/Paper';
import AndroidPhoneIcon from 'material-ui/svg-icons/hardware/phone-android';

class DeviceList extends Component {
  render() {
    return (
      <div style={style.container}>
        {this.props.devices.map((d, i) => {
          return (
            <Paper style={style.deviceBox} key={i} zDepth={2}>
              <div onClick={() => this.props.onDeviceClick(d)} style={style.deviceBoxContent}>
                <AndroidPhoneIcon style={style.phoneIcon}/>
                <div style={style.deviceName}>Name: {d.properties['ro.product.model']}</div>
                <div style={style.deviceSerial}>Serial: {d.serial}</div>
                <div style={style.deviceStatus}>Status: {d.status}</div>
              </div>
            </Paper>
          );
        })}
        <div>{(this.props.devices.length < 1)
            ? 'No devices found!'
            : ''}</div>

      </div>
    );
  }
}

DeviceList.propTypes = {
  devices: React.PropTypes.array.isRequired,
  onDeviceClick: React.PropTypes.func
};

export default DeviceList;
