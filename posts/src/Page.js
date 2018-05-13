import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import SearchForm from './components/posts/Search';
import PostsList from './components/posts/PostsList';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, 
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: 'New book',
    url: '',
    author: 'New author',
    num_comments: 1,
    points: 1,
    objectID: 2
  }
];

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      query: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);  
  }  
  
  onSearchChange(event) {
    const { value } = event.target
    this.setState({query: value}) // stored in local state
  }
  
  onDismiss(id) {
    // function isNotId(item) {
    //   return item.objectID !== id;
    // }
    // const isNotId = item => item.objectID !== id;
    // const updatedList = this.state.list.filter(isNotId);

    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }

  onSearchSubmit(event) {
    this.setState({queryActive: this.state.query});
    event.preventDefault();
  }

  render() {
    const { query, queryActive, list } = this.state;

    return (
      <BrowserRouter>
        <div className="page">
          <div className="interactions">
            <SearchForm 
                value={query}
                onChange={this.onSearchChange}
                onSearchSubmit={this.onSearchSubmit}>
            Search&nbsp;
            </SearchForm>
          </div>
          <PostsList
              list={list}
              pattern={queryActive}
              onDismiss={this.onDismiss} />
        </div>
      </BrowserRouter>
    );
  }
}
