export const PATH_BASE = 'https://hn.algolia.com/api/v1',
    PATH_SEARCH = '/search',
    PARAM_SEARCH = 'query=',
    PARAM_PAGE = 'page=',
    PARAM_HPP = 'hitsPerPage=';
     
export const DEFAULT_QUERY = 'redux',
    DEFAULT_HPP = '15';

export const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;
