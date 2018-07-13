import React from 'react';
import { Button } from '../shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SortButton(props) {
    const {sortKey, activeSortKey, handleSort, children} = props;

    let sortClass = `button-sort ${sortKey === activeSortKey ? 'button-active' : ' '}`;

    return (
        <Button
            className={sortClass}
            activeSortKey={sortKey}
            onClick={() => handleSort(sortKey)}>
            {
                sortKey === activeSortKey 
                ?
                <FontAwesomeIcon icon="arrow-up" />
                : 
                <FontAwesomeIcon icon="arrow-down" />
            }
            {children}
        </Button>    
    );    
}