import React, {Component} from 'react';
import style from './DeviceList.style';
import Paper from 'material-ui/Paper';
import SmartphoneIcon from 'material-ui/svg-icons/hardware/smartphone';
import LabelIcon from 'material-ui/svg-icons/action/label-outline';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import {List, ListItem} from 'material-ui/List';

class DeviceList extends Component {
  render() {
    return (
      <div style={style.container}>
        {this.props.devices.map((d, i) => {
          return (
            <div style={style.deviceBox} key={i} onClick={() => this.props.onDeviceClick(d)}>
              <Paper style={style.deviceBoxContent} zDepth={2}>
                <List>
                  <ListItem style={style.infoItem} disabled={true} primaryText={d.properties['ro.product.model']} leftIcon={<SmartphoneIcon />}/>
                  <ListItem style={style.infoItem} disabled={true} primaryText={d.serial} leftIcon={<LabelIcon />}/>
                  <ListItem style={style.infoItem} disabled={true} primaryText={d.status} leftIcon={<InfoIcon />}/>
                </List>
              </Paper>
            </div>
          );
        })}
        {(this.props.devices.length < 1) && <Paper style={style.noDevice}>
          <div>No devices found !</div>
        </Paper>}
      </div>
    );
  }
}

DeviceList.propTypes = {
  devices: React.PropTypes.array.isRequired,
  selectedDevice: React.PropTypes.object,
  onDeviceClick: React.PropTypes.func
};

export default DeviceList;
