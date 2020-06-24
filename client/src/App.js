import React, { Component } from 'react';
import Header from './HeaderComponent/Header';
import Form from './FormComponent/Form';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="body-container">
        <Header />
        <Form />
      </div>
    );
  }
}

export default App;
