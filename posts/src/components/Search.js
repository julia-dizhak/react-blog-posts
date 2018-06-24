import React from 'react';

export default function SearchForm(props) {
    const { value, onChange, onSubmit, children } = props;
    
    return (
        <form 
            onSubmit={onSubmit}
            className="search">
            { children } 
            <input
                type="search"
                value={value}
                onChange={onChange}
            />
            <button 
                type="submit"
                onSubmit={onSubmit}>
                Search
            </button>
        </form>
    );
}  