import React from 'react';

export default function SearchForm(props) {
    const { value, onChange, children } = props;
    
    return (
        <form 
            className="search">
            { children } 
            <input
                type="search"
                value={value}
                onChange={onChange}
            />
        </form>
    );
}  