import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import SearchForm from './components/posts/Search';
import PostsList from './components/posts/PostsList';
//import byQuery from './utils/filterByQuery';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const DEFAULT_QUERY = 'redux';
//const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      query: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);  
  }  

  setSearchTopStories(result) {
    this.setState({ result })
  }

  componentDidMount() {
    const { query } = this.state;
  
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}`)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(error => error);
  }

  onSearchChange(event) {
    const { value } = event.target;
    this.setState({ query: value }); // stored in local state
  }
  
  onSearchSubmit(event) {
    this.setState({ queryActive: this.state.query });
    event.preventDefault();
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
        </div>
      </BrowserRouter>
    );
  }
}
