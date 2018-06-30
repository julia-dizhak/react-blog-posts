import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Loading(props) {    
    return (
        <div > 
           Loading ...
           {/* <span className="fas fa-brands"></span>
           <span className="fa-regular"></span> */}
           Favorite Food: <FontAwesomeIcon icon="stroopwafel" />
           {/* <FontAwesomeIcon icon="spinner" spin /> */}
           {/* <FontAwesomeIcon icon="spinner" pulse /> */}
           <FontAwesomeIcon icon="coffee" />

           <div className="fa-3x">
                <i className="fas fa-spinner fa-spin"></i>
           </div>
        </div>
    );
}  
