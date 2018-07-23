import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Loading(props) {    
    return (
        <div className="loading"> 
            <FontAwesomeIcon icon="spinner" spin />
            &nbsp;
            <p className="text">Loading ... </p>
        </div>
    );
}  
