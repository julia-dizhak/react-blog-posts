import React, { Component }  from 'react';

export default class SearchForm extends Component {
    componentDidMount() {
        if (this.input) {
            this.input.focus()
        }
    }
    
    render() { 
        const { value, onChange, onSubmit, children } = this.props;

        return (
            <form 
                onSubmit={onSubmit}
                className="search">
                { children } 

                <input
                    type="search"
                    value={value}
                    onChange={onChange}
                    ref={(node) => { this.input = node; }}
                />

                <button 
                    className="button-search"
                    type="submit"
                    onSubmit={onSubmit}>
                    Search
                </button>
            </form>
        );
    }
}  
