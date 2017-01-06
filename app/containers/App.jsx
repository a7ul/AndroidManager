import React, {Component} from 'react';
// import DevTools from './DevTools';

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                {/*<DevTools />*/}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default App;
