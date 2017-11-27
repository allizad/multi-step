import React from 'react';
import PropTypes from 'prop-types';

class Step extends React.Component {
  renderChildren() {
    let MultiStepAPI = this.props.MultiStepAPI;
    let active = this.props.active;
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        active: active,
        MultiStepAPI: MultiStepAPI
      })
    })
  }

  render(){
    let activeClassName = this.props.active ? "active" : "";
    return (
      <div className={`_Step ${activeClassName}`}>
        {this.renderChildren()}
      </div>
    )
  }
}
Step.propTypes = {
  name: PropTypes.string.isRequired
}
export default Step;
