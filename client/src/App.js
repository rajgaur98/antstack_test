import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="body-container">
        <header className="header-class">
          <h1>
            Employee Data
          </h1>
        </header>
        <form>
          <div className="border-class">
            <label for="name">Name: </label>
            <input className="inputs" type="text" id="name" /><br />
            <label for="designation">Designation: </label>
            <input className="inputs" type="text" id="designation" /><br />
            <label for="contact">Contact Details: </label>
            <input className="inputs" type="text" id="contact" /><br />
            <label for="skills">Skills: </label>
            <input className="inputs" type="text" id="skills" /><br />
            <label for="dob">Date of Birth: </label>
            <input className="inputs" type="date" id="dob" />
          </div>
          <input className="btn btn-default" type="submit" value="Add Employee"/>
        </form>
        <button className="btn btn-default">View Data</button>
      </div>
    );
  }
}

export default App;
