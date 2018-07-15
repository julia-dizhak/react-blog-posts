import React, { Component } from 'react';

import News from './components/News';
import ErrorBoundary from './shared/ErrorBoundary';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel, faSpinner, faCoffee, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel, faSpinner, faCoffee, faArrowUp, faArrowDown );

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
