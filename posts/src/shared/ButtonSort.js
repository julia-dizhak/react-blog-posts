import React from 'react';
import { Button } from '../shared/Button';
import classNames from 'classnames';

export default function SortButton(props) {
    const {sortKey, activeSortKey, handleSort, children} = props;

    let sortClass = classNames(
        'button-sort',
        { 'button-active': sortKey === activeSortKey }
    );

    // const sortClass = ['button-sort'];
    // if (sortKey === activeSortKey) {
    //     sortClass.push('button-active');
    // }

    return (
        <Button
            //className={sortClass.join(' ')}
            className={sortClass}
            activeSortKey={sortKey}
            onClick={() => handleSort(sortKey)}>
            {children}
        </Button>    
    );    
}