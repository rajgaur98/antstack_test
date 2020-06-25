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

  // reference from https://stackoverflow.com/questions/51215642/converting-object-into-json-and-downloading-as-a-json-file-in-react/51215842 for downloading json
  exportToJson = () => {
    let objectData = this.state.employeeData;
    let filename = "export.json";
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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
        <button className="btn btn-default" onClick={this.exportToJson}>Download JSON</button>
      </div>
    );
  }
}

export default App;
