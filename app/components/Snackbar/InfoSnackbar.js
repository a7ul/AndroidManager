import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Drawer from 'material-ui/Drawer';

export default class InfoSnackbar extends Component {
  render() {
    return (
      <div>
        <Snackbar open={false}
          message={'test'}
          action={'More'}
          autoHideDuration={3000}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}/>
        <Drawer width={400}
          openSecondary={true}
          open={false}>
        </Drawer>
      </div>
    );
  }
}
