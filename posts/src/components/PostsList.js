import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import FlipMove from 'react-flip-move';

import { Button } from '../shared/Button';
import { SORTS } from './../constants/SORTS';
import SortButton from '../shared/ButtonSort';

const largeColumn = {width: '30%'},
    midColumn = {width: '26%'},
    smallColumn = {width: '29%'};

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
            sortKey: 'NONE',
            isSortReverse: false
        };

        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({sortKey, isSortReverse});
    }

    render() {  
        const {
            list, 
            onDismiss,
            onArchive  
        } = this.props; 
        
        const {
            sortKey, 
            isSortReverse
        } = this.state;

        const sortedList = SORTS[sortKey](list),
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
                                <span className="points">
                                    <span className="points-wrap">
                                        <SortButton
                                            sortKey={'POINTS'}
                                            activeSortKey={sortKey}
                                            isSortReverse={isSortReverse}
                                            handleSort={this.handleSort} 
                                        />
                                        points&nbsp;
                                    </span>
                                    {item.points}
                                </span>
                            </p>

                            <span style={midColumn}>
                                <span>{item.author}&nbsp;</span>
                            </span>
                            
                            <span style={smallColumn}>
                                <SortButton
                                    sortKey={'COMMENTS'}
                                    activeSortKey={sortKey}
                                    isSortReverse={isSortReverse}
                                    handleSort={this.handleSort} 
                                />
                                <span>comments: {item.num_comments}&nbsp;</span>
                            </span>

                            <span style={largeColumn}>
                                <Button
                                    className="button-cancel"
                                    onClick={() => onDismiss(item.objectID)}>
                                    Dismiss
                                </Button>

                                <Button
                                    onClick={() => onArchive(item.objectID)}>
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
