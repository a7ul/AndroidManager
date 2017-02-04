import React, {Component} from 'react';
import {render} from 'react-dom';
import routes from './router';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {initStore} from './redux/store/store';

import initialStoreState from './storeState.json';
import {connect} from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = initStore(initialStoreState);
const history = syncHistoryWithStore(hashHistory, store);

class MainComponent extends Component {
  themes = {
    'light': getMuiTheme(lightBaseTheme),
    'dark': getMuiTheme(darkBaseTheme)
  };
  render() {
    const vm = this;
    return (
      <MuiThemeProvider muiTheme={vm.themes[vm.props.state.settings.appTheme || 'light']}>
        <div>
          <Router routes={routes} history={history}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {state: state};
};

const mapDispatchToProps = () => {
  return {};
};

const ConnectedMainComponent = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

render(
  <Provider store={store}>
  <ConnectedMainComponent/>
</Provider>, document.getElementById('root'));
