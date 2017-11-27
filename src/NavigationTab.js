import React from 'react';
import PropTypes from 'prop-types';

class NavigationTab extends React.Component {
  render(){
    let tab = this.props.tab;
    let activeClassName = this.props.active ? "active" : "";
    return (
      <span className={`_NavigationTab ${activeClassName}`}
        onClick={this.props.onClick.bind(this, tab)}>
        {tab}
      </span>
    )
  }
}
NavigationTab.propTypes = {
  active: PropTypes.bool,
  tab: PropTypes.string
}

export default NavigationTab;
