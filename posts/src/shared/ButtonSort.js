import React from 'react';
import { Button } from '../shared/Button';

export default function SortButton(props) {
    const {sortKey, handleSort, children} = props;

    return (
        <Button
            className="button-sort"
            onClick={() => handleSort(sortKey)}>
            {children}
        </Button>    
    );    
}