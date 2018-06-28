import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node
};

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