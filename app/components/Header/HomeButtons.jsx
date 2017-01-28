import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import PlusIcon from 'material-ui/svg-icons/content/add';
import Toggle from 'material-ui/Toggle';
import AdbWirelessModal from '../Home/AdbWirelessModal';

class HeaderButtons extends React.Component {
  state = {
    modalOpen: false,
  };

  handleOpen = () => {
    this.setState({modalOpen: true});
  };

  handleClose = () => {
    this.setState({modalOpen: false});
    this.props.onRefreshClick();
  };

  handleToggle = (evt, value) => {
    this.props.onToggleClick(evt, value);
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
          }} defaultToggled={this.props.toggleDefault} onToggle={this.handleToggle} labelPosition="right"/>
        </IconButton>
        <IconButton tooltip="refresh" onClick={this.props.onRefreshClick}>
          <RefreshIcon/>
        </IconButton>
        <IconButton tooltip="Add device">
          <PlusIcon onClick={this.handleOpen}/>
        </IconButton>
        <AdbWirelessModal show={this.state.modalOpen} handleClose={()=>this.handleClose()}></AdbWirelessModal>
      </div>
    );
  }
}

HeaderButtons.propTypes = {
  onRefreshClick: PropTypes.func,
  onToggleClick: PropTypes.func,
  toggleDefault: PropTypes.bool
};

export default HeaderButtons;
