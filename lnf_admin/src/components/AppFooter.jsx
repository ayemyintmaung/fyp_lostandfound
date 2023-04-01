import React, { PureComponent } from "react";
import {PropTypes} from 'prop-types';

class AppFooter extends PureComponent {
  constructor(){
    super();
    this.state = {
      footerText: ''
    };
  }

  componentDidMount(){
    let {text} = this.props;

    this.setState({
      footerText: text
    });
  }

  render(){
    let {footerText} = this.state;

    return (
      <div className="App-footer">
        {footerText}
      </div>
    );
  }
}

AppFooter.propTypes = {
  text: PropTypes.string
};
AppFooter.defaultProps = {
  text: 'Set Footer Text as prop "text"'
};

export default AppFooter;