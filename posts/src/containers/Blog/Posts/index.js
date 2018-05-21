import React, { Component } from 'react'
import axios from '../../../axios';

import Post from '../../../components/Post';
import Link from 'react-router-dom/Link';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost';

export default class Posts extends Component {
    state = {
        posts: []
    };

    // fetching the data
    componentDidMount() {
        // can't store in const because of async
        //const posts = axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(this.props);
        
        axios.get('/posts')
            .then(response => {
                // example of transformation
                const posts = response.data.slice(0, 4); // get only first 4 posts
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Julia Dizhak'
                    }
                });
                //this.setState({posts: response.data});
                this.setState({ posts: updatedPosts });
                //console.log(response);
            })
            .catch(error => {
                console.log(error);
                //this.setState({ error: true });
            })
        //this.setState({posts: response.data}); will not work
    };

    postSelectedHandler = (id) => {
        // navigate programmatically, after smth
        this.props.history.push({pathname: '/' + id});
        //this.setState({ selectedPostId: id });
    };

    render() {
        let posts = <p style={{ textAlign: 'center', color: 'red' }}>Something went wrong.</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                )
            });
        }

        return (
            <div>
                <section className="posts">
                    {posts}
                </section>
                <Route path='posts/:id' exact component={FullPost} /> 
            </div>    
        )
    }
}
