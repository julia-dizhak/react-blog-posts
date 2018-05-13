import React from 'react';
import Button from './Button';


const largeColumn = { width: '40%'},
    midColumn = { width: '35%'},
    smallColumn = { width: '10%'};

function isSearched(searchTerm) {
    return function(item) {
      // filter return new array
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      //return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }
}

export default function PostsList(props) {  
    const { list, pattern, onDismiss } = props; 
    return (
        <React.Fragment>
            <ul className="posts-list">
            {list.filter(isSearched(pattern)).map(item =>
                <li 
                    className="posts" 
                    key={item.objectID}>
                    <span style={largeColumn}>
                        <a href={item.url}>{ item.title }&nbsp;</a>
                    </span>
                    <span style={midColumn}>{ item.author }&nbsp;</span>
                    <span style={smallColumn}>{ item.num_comments }&nbsp;</span>
                    <span style={{ width: '10%' }}>{ item.points }&nbsp;</span>
                    <span style={{ width: '30%' }}>
                        <Button
                           onClick={() => onDismiss(item.objectID)}>
                           Dismiss
                        </Button>
                    </span>
                </li> )   
            }
            </ul> 
        </React.Fragment> 
    );
}