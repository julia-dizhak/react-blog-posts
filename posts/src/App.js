import React, { Component } from 'react';
import News from './components/News';
import ErrorBoundary from './shared/ErrorBoundary';

class App extends Component {
  render () {
    return (
      <ErrorBoundary>
        <News /> 
      </ErrorBoundary>
    );
  }
}

export default App;
