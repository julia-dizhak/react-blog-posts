import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import SearchForm from './components/posts/Search';
import PostsList from './components/posts/PostsList';
import Button from './components/posts/Button';
//import byQuery from './utils/filterByQuery';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const DEFAULT_QUERY = 'redux';
const PARAM_PAGE = 'page=';
//const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      query: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);  
  }  

  setSearchTopStories(result) {
    this.setState({ result })
  }

  fetchSearchTopStories(query, page = 0) {
    console.log(page);
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
    }

  componentDidMount() {
    const { query } = this.state;

    this.fetchSearchTopStories(query);
  }

  onSearchChange(event) {
    const { value } = event.target;
    this.setState({ query: value }); // stored in local state
  }
  
  onSearchSubmit(event) {
    //this.setState({ queryActive: this.state.query });

    const { query } = this.state;

    this.fetchSearchTopStories(query);
    event.preventDefault(); // suppress thw native browser behavior
  }

  onDismiss(id) {
    // function isNotId(item) {
    //   return item.objectID !== id;
    // }
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);

    // this.setState({
    //   result: Object.assign({}, this.state.result, {hits: updatedHits})
    // });
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    })
  }

  render() {
    //const { queryActive } = this.state; // for onSubmit
    const { query, result } = this.state;
    const page = (result && result.page) || 0;
    //const filteredList = result.filter(byQuery(query));
    
    //console.log(result);
    if (!result) {
      return null;
    }

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

          {result ?
            <PostsList
              list={result.hits}
              onDismiss={this.onDismiss}
            />
            : null
          } 

          <div className="interactions">
              <Button
                onClick={() => this.fetchSearchTopStories(query, page + 1)}>More</Button>  
          </div>  

        </div>
      </BrowserRouter>
    );
  }
}
