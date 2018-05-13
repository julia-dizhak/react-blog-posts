import React from 'react';
import Button from './Button';

const largeColumn = { width: '40%'},
    midColumn = { width: '35%'},
    smallColumn = { width: '10%'};

// function isSearched(query='') {
//     return function(item) {
//       // filter return new array
//       return !query || item.title.toLowerCase().includes(query.toLowerCase());
//       //return !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
//     }
// }

export default function PostsList(props) {  
    const { list, onDismiss, onArchive } = props; 
    return (
        <React.Fragment>
            <ul className="posts-list">
            {list.map(item =>
                <li 
                    className="posts" 
                    key={item.objectID}>
                    <span style={largeColumn}>
                        <a href={item.url}>{ item.title }&nbsp;</a>
                    </span>
                    <span style={midColumn}>{ item.author }&nbsp;</span>
                    <span style={smallColumn}>{ item.num_comments }&nbsp;</span>
                    <span style={{width: '10%'}}>{ item.points }&nbsp;</span>
                    <span style={{width: '30%'}}>
                        <Button
                           onClick={() => onDismiss(item.objectID)}>
                           Dismiss
                        </Button>
                        <Button
                           onClick={() => onArchive(item.id)}>
                           Archive
                        </Button>
                    </span>
                </li> )   
            }
            </ul> 
        </React.Fragment> 
    );
}