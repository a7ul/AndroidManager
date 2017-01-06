import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Test from '../components/Test/Test';
import * as actions from '../redux/actions/index';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Test content={this.props.state.sample.payload} onClick={this.props.actions.sampleAction}/>
      </div>
    );
  }
}

HomePage.propTypes = {
  state: React.PropTypes.object,
  actions: React.PropTypes.object
};

let mapStateToProps = (state) => {
  return {state: state};
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
