import React, { Component } from 'react';
import Header from './HeaderComponent/Header';
import Form from './FormComponent/Form';
import ViewData from './ViewDataComponent/ViewData';
import './App.css';

class App extends Component {

  state = {
    numOfForms: 1,
    employeeData: [],
    toggle: false,
  }

  addFormField = () => {
    this.setState({numOfForms: this.state.numOfForms+1});
  }

  addData = () => {
    this.setState({toggle: !this.state.toggle});
  }

  backToApp = (data) => {
    this.setState({employeeData: data}, () => console.log(this.state.employeeData));
  }

  render(){
    return (
      <div className="body-container">
        <Header />
        <Form numOfForms={this.state.numOfForms} toggle={this.state.toggle} backToApp={this.backToApp}/>
        <button className="btn btn-default" onClick={this.addFormField}>Add Employee</button>
        <button className="btn btn-default" onClick={this.addData}>Add Data</button>
        <button className="btn btn-default" >View Data</button>
        <ViewData employeeData={this.state.employeeData}/>
      </div>
    );
  }
}

export default App;
