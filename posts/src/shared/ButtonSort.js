import React from 'react';
import { Button } from '../shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import classNames from 'classnames';

export default function SortButton(props) {
    const { sortKey, activeSortKey, handleSort, children } = props;

    // let sortClass = classNames(
    //     'button-sort',
    //     { 'button-active': sortKey === activeSortKey }
    // );

    let sortClass = `button-sort ${sortKey === activeSortKey ? 'button-active' : ' '}`;

    return (
        <Button
            className={sortClass}
            activeSortKey={sortKey}
            onClick={() => handleSort(sortKey)}>
            {
                (sortKey === activeSortKey)
                // (sortKey === activeSortKey && sortClass.className('button-sort'))
                ?
                <FontAwesomeIcon icon="arrow-up" />
                : 
                <FontAwesomeIcon icon="arrow-down" />
            }
            {children}
        </Button>    
    );    
}