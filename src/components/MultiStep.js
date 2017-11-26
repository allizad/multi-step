import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

import css from './multi-step.scss';

class MultiStep extends React.Component {
  constructor(props) {
    super(props);
    // a hash of the Step children with the names as keys ("step" children...lol)
    const steps = {};
    // for rendering the clickable navigation
    const tabs = [];
    // Fot handling step forward and step back
    const stepList = [];
    // TODO: raise error if two children have the same name
    this.props.children.map((c) => {
      let name = c.props.name;
      steps[name] = c;
      stepList.push(name);
    })
    let initialStep = Object.keys(steps)[0];
    this.state = {
      currentStep: initialStep,
      steps: steps,
      stepList: stepList
    }
  }

  renderSteps() {
    let stepForward = this.stepForward.bind(this);
    let stepBack = this.stepBack.bind(this);

    let MultiStepAPI = {
     stepForward: stepForward,
     stepBack: stepBack
    }

    return React.Children.map(this.props.children, child => {
      let active = (child.props.name == this.state.currentStep);
      return React.cloneElement(child, {
        active: active,
        MultiStepAPI: MultiStepAPI
      })
    })
  }

  onChange(step, e) {
    this.setState({ currentStep: step });
  }
  stepForward() {
    // 1. find the index of the current step
    let currentIndex = this.state.stepList.indexOf(this.state.currentStep);
    // 2. increment to the next index step
    let newStepValue = this.state.stepList[currentIndex + 1];
    // 3. if the incremented step goes beyond the length of the step array, set it to the first
    if (newStepValue == undefined) {
      newStepValue = this.state.stepList[0]
    }
    // 4. set the new value
    this.setState({ currentStep: newStepValue })
  }
  stepBack() {
    let stepList = this.state.stepList;
    // 1. find the index of the current step
    let currentIndex = stepList.indexOf(this.state.currentStep);
    // 2. increment to the next index step
    let newStepValue = stepList[currentIndex - 1];
    // 3. if the incremented step if less than 0, set it to the last step
    if (newStepValue == undefined) {
      newStepValue = stepList[stepList.length - 1]
    }
    // 4. set the new value
    this.setState({ currentStep: newStepValue })
  }

  render(){
    return (
      <div className="_MultiStep">
        <div className="_MultiStep-navigation">
          <Navigation activeTab={this.state.currentStep}
            tabs={this.state.stepList} onChange={this.onChange.bind(this)}/>
        </div>
        <div className="_MultiStep-content">
          { this.renderSteps() }
        </div>
      </div>
    )
  }
}
import Step from './Step';
MultiStep.Step = Step;

export default MultiStep;
