import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}, defaultProps = {
    className: 'button'
};

export default function Button(props) {
    const { className, onClick, children } = props;
    
    return (
        <button 
           className={className}
           onClick={onClick}>
            { children }
        </button>
    );
}  

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
