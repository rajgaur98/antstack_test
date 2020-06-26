import React, { Component } from 'react';
import Header from './HeaderComponent/Header';
import Form from './FormComponent/Form';
import ViewData from './ViewDataComponent/ViewData';
import './App.css';

class App extends Component {

  state = {
    numOfForms: 1,
    employeeData: [],
    isShowingData: false,
    toggle: false,
  }

  addFormField = () => {
    this.setState({numOfForms: this.state.numOfForms+1});
  }

  addData = () => {
    this.setState({toggle: !this.state.toggle, isShowingData: false});
  }

  showData = () => {
    this.setState({isShowingData: true});
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
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData, null, 2)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData, null, 2));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  render(){
    return (
      <div className="container body-container">
        <Header />
        <Form numOfForms={this.state.numOfForms} toggle={this.state.toggle} backToApp={this.backToApp}/>
        <button className="btn btn-default col-md-3" onClick={this.addFormField}>Add Employee</button>
        <button className="btn btn-default col-md-3" onClick={this.addData}>Submit Data</button>
        <button className="btn btn-default col-md-3" onClick={this.showData}>View Data</button>
        {
          this.state.isShowingData?
          <div className="border-class">
            <ViewData employeeData={this.state.employeeData}/>
            {
              this.state.employeeData.length === 0? <p>Please enter some data first</p>: 
              <button className="btn btn-default" onClick={this.exportToJson}>Download JSON</button>
            }
          </div>
          : null
        }
      </div>
    );
  }
}

export default App;
