import React from 'react';
import PropTypes from 'prop-types';
import NavigationTab from './NavigationTab';

const makeProps = (settings) => Object.assign({}, defaults, settings);

class Navigation extends React.Component {
  renderLabels() {
    if (this.props.tabs) {
      let onChange = this.props.onChange.bind(this);
      return this.props.tabs.map((tab, i) => {
        let active = (this.props.activeTab == tab);
        return (
          <NavigationTab active={active} tab={tab} key={i} onClick={onChange}/>
        )
      })
    }
  }
  render(){
    return (
      <div className="_Navigation">
        <ul className="_Navigation-tabs">
        {this.renderLabels()}
        </ul>
      </div>
    )
  }
}
Navigation.propTypes = {
  activeTab: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.string)
}
export default Navigation;
