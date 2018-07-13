import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'; 
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PostsList from './PostsList';

Enzyme.configure({ adapter: new Adapter() });

describe('PostsList', () => {
    const props = {
        list: [
            { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
            { title: '2', author: '2', num_comments: 2, points: 3, objectID: 'z' },
        ],
        onDismiss: () => {},
        sortKey: 'TITLE',
        isSortReverse: false
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PostsList {...props} />, div);
    });
    
    test('has a valid snapshot', () => {
        const component = renderer.create(
            <PostsList {...props} />
        );
        
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows two items in list', () => {
        const element = shallow(
            <PostsList {...props} />
        );

        expect(element.find('.posts-list li').length).toBe(2);
    });
});
