export const PATH_BASE = 'https://hn.algolia.com/api/v1',
    PATH_SEARCH = '/search',
    PARAM_SEARCH = 'query=',
    PARAM_PAGE = 'page=',
    PARAM_HPP = 'hitsPerPage=';
     
export const DEFAULT_QUERY = 'redux',
    DEFAULT_HPP = '15';

export const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

// fake
export const LIST = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: '0',
    }, 
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: '1'
    },
    {
        title: 'test',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: '2',
    },
    {
        title: 'test1',
        url: 'https://facebook.github.io/react/',
        author: 'Jtest',
        num_comments: 3,
        points: 40,
        objectID: '3',
    }
];