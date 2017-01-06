import React, {Component} from 'react';
import './Test.scss';

class Test extends Component {
    render() {
        return (
            <div className="test-container">
                {this.props.content}
                <br />
                <input type="text" ref="textInput"/>
                <input type="button" ref="submit" value="submit" onClick={() => {
                    this.props.onClick(this.refs.textInput.value);
                }}/>
            </div>
        );
    }
}

Test.propTypes = {
    content: React.PropTypes.string,
    onClick: React.PropTypes.func
};

export default Test;
