import React, { Component } from 'react';
import Inputs from './Inputs';

class Form extends Component {
  state = {
    formArray: [],
    inputData: [],
    toggle: this.props.toggle,
  };

  componentDidUpdate(prevProps){
    if(prevProps.numOfForms !== this.props.numOfForms)
      this.setForms();
    if(prevProps.toggle !== this.props.toggle)
      this.toggleForInputs();
  }

  componentDidMount(){
    this.setForms();
  }

  render(){
    return this.state.formArray.map(
      (element) => element
    );
  }

  setForms = () => {
    this.setState({formArray: [...Array(this.props.numOfForms)].map((e, i) => 
      (
        <Inputs key={i} toggle={this.state.toggle} addFormData={this.addFormData} />
      )
    )});
  }

  toggleForInputs = () => {
    this.setState({toggle: !this.state.toggle, inputData: []}, () => this.setForms());
  }

  addFormData = (data) => {
    this.setState((state, props) => ({
      inputData: [...state.inputData, data]
    }), () => this.props.backToApp(this.state.inputData));
  }
}

export default Form;
