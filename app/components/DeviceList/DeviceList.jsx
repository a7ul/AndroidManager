import React, {Component} from 'react';
import style from './DeviceList.style';

class DeviceList extends Component {
  render() {
    return (
      <div style={style.container}>
        {this.props.devices.map((d, i) => {
          return (
            <div style={style.deviceBox} key={i}>
              <div style={style.deviceBoxContent}>
                <div style={style.deviceName}>{d.name}</div>
                <div style={style.deviceStatus}>{d.status}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

DeviceList.propTypes = {
  devices: React.PropTypes.array.isRequired
};

export default DeviceList;
