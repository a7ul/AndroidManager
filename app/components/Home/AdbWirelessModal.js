import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {executeAdb} from '../../utils/adb';

class AdbWirelessModal extends React.Component {
  state = {
    ipAddress: ''
  };

  handleOpen = () => {
    executeAdb(['tcpip', '5555']).then(res => console.log(res));
  };

  handleClose = () => {
    this.props.handleClose();
    this.setState({ipAddress: ''});
  };

  handleIPAddress = (e, val) => {
    this.setState({ipAddress: val});
  }

  handleSubmit = () => {
    executeAdb(['connect', this.state.ipAddress]).then(res => {
      console.log('log:', 'res from wireless connect ', res);
      this.handleClose();
    });
  }

  actions=[<FlatButton label = "Cancel" primary = {
      true
    }
    onTouchTap = {
      this.handleClose
    } > </FlatButton>, <FlatButton label = "Submit" primary = {
      true
    }
    keyboardFocused = {
      true
    }
    onTouchTap = {
      this.handleSubmit
    } />
  ]
  render() {
    return (
      <Dialog title="Add a wireless device" actions={this.actions} modal={false} open={this.props.show} onRequestClose={this.handleClose}>
        Open the ADB wireless app on your phone. Make sure that you have done the initial configuration (adb tcpip 5555).
        <TextField hintText="Enter your mobile's IP address" onChange={this.handleIPAddress}></TextField>
      </Dialog>
    );
  }
}

AdbWirelessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AdbWirelessModal;
