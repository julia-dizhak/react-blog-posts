import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import SearchForm from './components/posts/Search';
import PostsList from './components/posts/PostsList';
import Button from './components/posts/Button';
//import byQuery from './utils/filterByQuery';

const PATH_BASE = 'https://hn.algolia.com/api/v1',
     PATH_SEARCH = '/search',
     PARAM_SEARCH = 'query=',
     PARAM_PAGE = 'page=',
     PARAM_HPP = 'hitsPerPage=';
     
const DEFAULT_QUERY = 'redux',
    DEFAULT_HPP = '15';

//const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '', // is used to store each result
      query: DEFAULT_QUERY
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);  
  }  

  // check that prevents the request to API if searchKey was already saved
  needsToSearchTopStories(query) {
    return !this.state.results[query]
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    
    // concatenate the old and new list of hits from the local state and new result object
    const oldHits = results && results[searchKey]
    ? results[searchKey].hits 
    : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({ 
      results: { 
        ...results,
        [searchKey]: {hits: updatedHits, page}
      } 
    });
  }

  fetchSearchTopStories(query, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
    }

  componentDidMount() {
    const { query } = this.state;
    this.setState({searchKey: query})
    this.fetchSearchTopStories(query);
  }

  onSearchChange(event) {
    const { value } = event.target;
    this.setState({ query: value }); // stored in local state
  }
  
  onSearchSubmit(event) {
    const { query } = this.state;
    this.setState({searchKey: query})

    if (this.needsToSearchTopStories(query)) {
      this.fetchSearchTopStories(query);
    }

    event.preventDefault(); // suppress the native browser behavior
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    // function isNotId(item) {
    //   return item.objectID !== id;
    // }
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    // or can use Object.assign
    this.setState({
      ...results,
      [searchKey]: {hits: updatedHits, page}
    })
  }

  render() {
    const { query, results, searchKey } = this.state;

    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page 
    ) || 0;

    const list = (
      results && 
      results[searchKey] &&
      results[searchKey].hits 
    ) || [];

    // const message = 'no news from HackerNews API or there is no internet connection';

    // const noResult = `<div className="message">message</div>`;

    // if (!results) {
    //   return noResult;
    // }

    return (
      <BrowserRouter>
        <div className="page">

          <div className="interactions">
            <SearchForm 
                value={query}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}>
            Search&nbsp;
            </SearchForm>
          </div>

          {results &&
            <PostsList
              list={list}
              onDismiss={this.onDismiss}
            />
          } 

          <div className="interactions">
              <Button
                onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>More</Button>  
          </div>  

        </div>
      </BrowserRouter>
    );
  }
}
