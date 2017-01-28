import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

class HeaderButtons extends React.Component {
  render() {
    return (
      <div>
        <IconButton tooltip="refresh" onClick={this.props.onRefreshClick}>
          <RefreshIcon/>
        </IconButton>
      </div>
    );
  }
}

HeaderButtons.propTypes = {
  onRefreshClick: PropTypes.func,
};

export default HeaderButtons;
