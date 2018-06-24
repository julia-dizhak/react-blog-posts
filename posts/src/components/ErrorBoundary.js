import React, { Component } from 'react';

export default class ErrorBoundary extends Component {  
    constructor(props) {
        super(props);
        
        this.state = {
          hasError: false
        };
    }
    
    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        });
        //logErrorToMyService(error, info);
    }

    render() {  
       if (this.state.hasError) {
           return (
                <div>
                    <p>Something went wrong.</p>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>   
           )     
       }
       return this.props.children;
    }    
}