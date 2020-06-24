import React, { Component } from 'react';
import Header from './HeaderComponent/Header';
import Form from './FormComponent/Form';
import './App.css';

class App extends Component {

  state = {
    numOfForms: 1,
    toggle: false,
  }

  addFormField = () => {
    this.setState({numOfForms: this.state.numOfForms+1});
  }

  viewData = () => {
    this.setState({toggle: !this.state.toggle});
  }

  backToApp = (data) => {
    console.log(data);
  }

  render(){
    return (
      <div className="body-container">
        <Header />
        <Form numOfForms={this.state.numOfForms} toggle={this.state.toggle} backToApp={this.backToApp}/>
        <button className="btn btn-default" onClick={this.addFormField}>Add Employee</button>
        <button className="btn btn-default" onClick={this.viewData}>View Data</button>
      </div>
    );
  }
}

export default App;
