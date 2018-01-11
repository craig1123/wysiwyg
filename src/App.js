import React, { Component } from 'react';
import EditorConvertToJSON from './EditorConvertToJSON';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 style={{ textAlign: 'center' }}>WYSIWYG</h1>

          <EditorConvertToJSON />
      </div>
    );
  }
}

export default App;
