import React from 'react';
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
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = initStore(initialStoreState);
const history = syncHistoryWithStore(hashHistory, store);

const MainComponent = connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Router routes={routes} history={history}/>
        </div>
      </MuiThemeProvider>
    );
  }
}));

const mapStateToProps = (state) => {
  return {state: state};
};

const mapDispatchToProps = () => {
  return {};
};

render(
  <Provider store={store}>
  <MainComponent/>
</Provider>, document.getElementById('root'));
