import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '../shared/Button';
import byArchived from './../utils/archived';

import { SORTS } from './../constants/SORTS';
import SortButton from '../shared/ButtonSort';

const largeColumn = {width: '30%'},
    midColumn = {width: '15%'},
    smallColumn = {width: '10%'};

const propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired
};

export default class PostsList extends Component {  
    constructor(props) {
        super(props);
        
        this.state = {
          archivedItems: []
        };

        this.onArchive = this.onArchive.bind(this);
    }

    onArchive(id) {
        const { archivedItems } = this.state;
    
        this.setState({
            archivedItems: [...archivedItems, id]
        });
    }

    render() {  
        const {list, onDismiss, sortKey, handleSort, isSortReverse} = this.props; 
        const {archivedItems} = this.state;

        const filteredList = list.filter(byArchived(archivedItems)),
            sortedList = SORTS[sortKey](filteredList),
            reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList; 

        if (!list) {
            return null;
        }

        return (
            <React.Fragment>
                <ul className="posts-list">
                {reverseSortedList.map(item =>
                    <li 
                        className="posts" 
                        key={item.objectID}>
                        <span 
                            style={largeColumn} 
                            className="title">
                            <SortButton
                                sortKey={'TITLE'}
                                activeSortKey={sortKey}
                                handleSort={handleSort}>
                                title
                            </SortButton>    
                            <a href={item.url} target="_blank">{item.title}&nbsp;</a>
                        </span>

                        <span style={midColumn}>{item.author}&nbsp;</span>
                        
                        <span style={smallColumn}>{item.num_comments}&nbsp;</span>
                        <span style={{width: '10%'}}>{item.points}&nbsp;</span>
                        <span style={{width: '30%'}}>
                            <Button
                                className="button-cancel"
                                onClick={() => onDismiss(item.objectID)}>
                                Dismiss
                            </Button>
                            <Button
                                onClick={() => this.onArchive(item.objectID)}>
                                Archive
                            </Button>
                        </span>
                    </li> )   
                }
                </ul> 
            </React.Fragment> 
        );
    }    
}

PostsList.propTypes = propTypes;
