import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

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
  }
];

function isSearched(searchItem) {
  return function(item) {
    // filter return new array
    return item.title.toLowerCase().includes(searchItem.toLowerCase());
    //return item.title.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchItem: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }  
  
  onSearchChange(event) {
    this.setState({searchItem: event.target.value}) // stored in local state
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

  render () {
    const { searchTerm, list } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          {/* <Blog /> */}
      
          <form>
            <input 
                type="text"
                onChange={this.onSearchChange} 
            />
          </form>

          {list.filter(isSearched(searchItem)).map(item => {
             return (
                <div key={item.objectID}>
                  <span>
                    <a href={item.url}>{ item.title }</a>
                  </span>
                  <span>{ item.author }</span>
                  <span>{ item.num_comments }</span>
                  <span>{ item.points }</span>
                  <span>{ new Date().toString() }</span>

                  <button
                      onClick={() => this.onDismiss(item.objectID)}
                      type="button">
                      Dismiss
                  </button>  
                </div> 
              );
          })}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
