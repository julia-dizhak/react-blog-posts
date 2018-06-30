import React, { Component } from 'react';

import News from './components/News';
import ErrorBoundary from './shared/ErrorBoundary';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel, faSpinner, faCoffee } from '@fortawesome/free-solid-svg-icons';
//import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel, faSpinner, faCoffee);

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
