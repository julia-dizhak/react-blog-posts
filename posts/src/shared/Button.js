import React from 'react';

import PropTypes from 'prop-types';

import withLoading from './../hoc/withLoading';

const propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}, defaultProps = {
    className: 'button'
};

export function Button(props) {
    const {className, onClick, children} = props;
    
    return (
        <button 
           className={className}
           onClick={onClick}>
            {children}
        </button>
    );
}  

export const ButtonWithLoading = withLoading(Button);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
