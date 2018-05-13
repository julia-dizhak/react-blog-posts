import React from 'react';

export default function SearchForm(props) {
    const { value, onChange, onSearchSubmit, children } = props;
    
    return (
        <form 
            onSubmit={onSearchSubmit}
            className="search">
            { children } 
            <input
                type="search"
                value={value}
                onChange={onChange}
            />
            <button 
                type="submit"
                onSubmit={onSearchSubmit}>
                Search
            </button>
        </form>
    );
}  