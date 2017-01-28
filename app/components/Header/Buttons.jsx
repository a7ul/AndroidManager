import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import PlusIcon from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {addWirelessDevice} from '../../redux/actions';
import {executeAdb} from '../../utils/adb';

const mapDispatchToProps = (dispatch) => ({
  addWirelessDevice: (ip) => {
    console.log('adding wireless device with id', ip);
    dispatch(addWirelessDevice(ip)); //not required now, to be removed tomorrow
  }
});
class HeaderButtons extends React.Component {
  state = {
    modalOpen: false,
    ipAddress: ''
  };

  handleOpen = () => {
    this.setState({modalOpen: true});
    executeAdb(['tcpip', '5555']).then(res => console.log(res));
  };

  handleClose = () => {
    this.setState({modalOpen: false, ipAddress: ''});
  };

  handleToggle = (evt, value) => {
    this.props.onToggleClick(evt, value);
  }

  handleIPAddress = (e, val) => {
    this.setState({ipAddress: val});
  }

  handleSubmit = () => {
    this.props.addWirelessDevice(this.state.ipAddress);
    executeAdb(['connect', this.state.ipAddress]).then(res => {
      console.log('log:', 'res from wireless connect ', res);
      this.props.onRefreshClick();
      this.handleClose();
    });
  }

  getModalContent = () => {
    const actions = [ < FlatButton label = "Cancel" primary = {
        true
      }
      onTouchTap = {
        this.handleClose
      } />, < FlatButton label = "Submit" primary = {
        true
      }
      keyboardFocused = {
        true
      }
      onTouchTap = {
        this.handleSubmit
      } />
    ];
    return (
      <Dialog title="Add a wireless device" actions={actions} modal={false} open={this.state.modalOpen} onRequestClose={this.handleClose}>
        Open the ADB wireless app on your phone. Make sure that you have done the initial configuration (adb tcpip 5555).
        <TextField hintText="Enter your mobile's IP address" onChange={this.handleIPAddress}/>
      </Dialog>
    );
  }

  render() {
    return (
      <div>
        <IconButton tooltip="Toggle device polling" style={{
          display: 'inline-block',
          width: 'auto',
          padding: 0,
          transform: 'translate(0px, -5px)'
        }}>
          <Toggle label="Styling" trackSwitchedStyle={{
            backgroundColor: 'lightblue'
          }} thumbSwitchedStyle={{
            backgroundColor: 'black'
          }} defaultToggled={true} onToggle={this.handleToggle} labelPosition="right"/>
        </IconButton>
        <IconButton tooltip="refresh" onClick={this.props.onRefreshClick}>
          <RefreshIcon/>
        </IconButton>
        <IconButton tooltip="Add device" onClick= {() => { }}>
          <PlusIcon onClick={this.handleOpen}/>
        </IconButton>
        {this.getModalContent()}
      </div>
    );
  }
}

HeaderButtons.propTypes = {
  onRefreshClick: PropTypes.func,
  onToggleClick: PropTypes.func,
  addWirelessDevice: PropTypes.func
};

export default connect(null, mapDispatchToProps)(HeaderButtons);
