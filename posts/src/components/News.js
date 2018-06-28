import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import SearchForm from './Search';
import PostsList from './PostsList';
import Button from '../shared/Button';

import { 
  PATH_BASE, 
  PATH_SEARCH, 
  PARAM_SEARCH, 
  PARAM_PAGE, 
  PARAM_HPP,
  DEFAULT_QUERY, 
  DEFAULT_HPP
} from './../constants/API.js';


export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      test: 1,
      results: null,
      searchKey: '', // is used to store each result
      query: DEFAULT_QUERY,
      error: null
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
    return !this.state.results[query];
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
      .catch(error => this.setState({ error })); 
    }

  componentDidMount() {
    const { query } = this.state;
    this.setState({
      searchKey: query,
      isMounted: true
    });
    this.fetchSearchTopStories(query);
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
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
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      }
    })
  }

  render() {
    const { query, results, searchKey, error } = this.state;

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

    const errorMessage = 'no news from HackerNews API or there is no internet connection or smth went wrong';

    return (
      <BrowserRouter>
        <div className="page">

          <div className="interactions">
            <SearchForm 
                value={query}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}>
            search from HackerNews API &nbsp;
            </SearchForm>
          </div>

          {error ?
              <div className="message">{errorMessage}</div>
              : <PostsList
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
