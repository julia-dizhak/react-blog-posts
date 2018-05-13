import React from 'react';

export default function Button(props) {
    const { className='button', onClick, children } = props;
    
    return (
        <button 
           className={className}
           onClick={onClick}>
            { children }
        </button>
    );
}  