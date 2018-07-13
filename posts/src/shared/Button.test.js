import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'; 

import {Button} from './Button';

describe('Button component', () => {
    it('renders without crashing', () => {
        const props = { onClick: () => {} };
        const div = document.createElement('div');

        ReactDOM.render(<Button {...props}>Give Me More</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    test('has a valid snapshot', () => {
        const props = { onClick: () => {} };
        const component = renderer.create(<Button {...props}>Give Me More</Button>);
        
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
