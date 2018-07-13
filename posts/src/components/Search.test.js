import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'; 
import SearchForm from './Search';

describe('Search form', () => {
    it.skip('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SearchForm>Search</SearchForm>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    test.skip('has a valid snapshot', () => {
        const component = renderer.create(
        <SearchForm>search</SearchForm>
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});