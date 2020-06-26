import React, { Component } from 'react';
import Inputs from './Inputs';

class Form extends Component {
  state = {
    formArray: [true],
    inputData: [],
    allFormsValid: true,
    clearFormData: false,
    toggle: this.props.toggle,
  };

  componentDidUpdate(prevProps){
    if(prevProps.numOfForms !== this.props.numOfForms)
      this.setForms();
    if(prevProps.toggle !== this.props.toggle)
      this.toggleForInputs();
  }

  render(){
    return this.state.formArray.map((e, i) =>
      ( <div className="border-class" key={i}>
          {i === 0? null: <button className="delete-button" onClick={this.deleteForm(i)}>x</button>}
          <Inputs key={i} toggle={this.state.toggle} addFormData={this.addFormData} clearFormData={this.state.clearFormData}/>
        </div>
      )
    );
  }

  deleteForm = (index) => (event) => {
    this.setState((state, props) => ({
      formArray: state.formArray.filter((e, i) => i !== index)
    }));
  }

  setForms = () => {
    this.setState((state, props) => ({formArray: [...state.formArray, true]}));
  }

  toggleForInputs = () => {
    this.setState({toggle: !this.state.toggle, inputData: []});
  }

  addFormData = (data) => {
    this.setState((state, props) => ({
      inputData: [...state.inputData, data]
    }), () => {
      if(this.state.formArray.length === this.state.inputData.length) {
        this.setState({clearFormData: true}, () => {
          this.setState({clearFormData: false})
        });
        this.props.backToApp(this.state.inputData); 
      }
    });
  }
}

export default Form;
