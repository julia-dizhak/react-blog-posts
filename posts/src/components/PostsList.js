import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '../shared/Button';
import byArchived from './../utils/archived';

import { SORTS } from './../constants/SORTS';
import SortButton from '../shared/ButtonSort';

const largeColumn = {width: '30%'},
    midColumn = {width: '20%'},
    smallColumn = {width: '20%'};

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
            archivedItems: [],
            sortKey: 'NONE',
            isSortReverse: false
        };

        this.onArchive = this.onArchive.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    onArchive(id) {
        const { archivedItems } = this.state;
    
        this.setState({
            archivedItems: [...archivedItems, id]
        });
    }

    handleSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({sortKey, isSortReverse});
    }

    render() {  
        const {
            list, 
            onDismiss,  
        } = this.props; 
        
        const {
            archivedItems,
            sortKey, 
            isSortReverse
        } = this.state;

        const filteredList = list.filter(byArchived(archivedItems)),
            sortedList = SORTS[sortKey](filteredList),
            reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList; 

        if ( !list ) {
            return null;
        }

        return (
            <React.Fragment>
                <ul className="posts-list">
                {reverseSortedList.map(item =>
                    <li 
                        className="posts" 
                        key={item.objectID}>
                        <p className="title">
                            <SortButton
                                sortKey={'TITLE'}
                                activeSortKey={sortKey}
                                isSortReverse={isSortReverse}
                                handleSort={this.handleSort} 
                            />  
                            <a href={item.url} target="_blank" className="title-link">{item.title}&nbsp;</a>
                        </p>

                        <span style={midColumn}>
                            <SortButton
                                sortKey={'AUTHOR'}
                                activeSortKey={sortKey}
                                isSortReverse={isSortReverse}
                                handleSort={this.handleSort} 
                            />
                            <a href={item.author} target="_blank">{item.author}&nbsp;</a>
                        </span>
                        
                        <span style={smallColumn}>
                            <SortButton
                                sortKey={'COMMENTS'}
                                activeSortKey={sortKey}
                                isSortReverse={isSortReverse}
                                handleSort={this.handleSort} 
                            />
                            <span>{item.num_comments}&nbsp;</span>
                        </span>

                        <span style={smallColumn}>
                            <SortButton
                                sortKey={'POINTS'}
                                activeSortKey={sortKey}
                                isSortReverse={isSortReverse}
                                handleSort={this.handleSort} 
                            />
                            <span>{item.points}&nbsp;</span>
                        </span>

                        <span style={largeColumn}>
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
