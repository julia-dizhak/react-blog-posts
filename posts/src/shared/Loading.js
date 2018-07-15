import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Loading(props) {    
    return (
        <div className="loading"> 
            Loading ...
            <FontAwesomeIcon icon="spinner" spin />
            {/* <FontAwesomeIcon icon="spinner" pulse /> */}
           

            <div className="fa-3x">
                <i className="fas fa-spinner fa-spin"></i>
            </div>
        </div>
    );
}  
