import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchForm from './Search';
import PostsList from './PostsList';
import { ButtonWithLoading } from './../shared/Button';
import withArchiveHOC from './../hoc/withArchive';

import {
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
    DEFAULT_QUERY,
    DEFAULT_HPP,
    //LIST
} from './../constants/API.js';

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
    const { searchKey, results } = prevState;

    // concatenate the old and new list of hits from the local state 
    // and new result object
    const oldHits = results && results[searchKey]
        ? results[searchKey].hits
        : [];

    const updatedHits = [
        ...oldHits,
        ...hits
    ];

    return {
        results: {
            ...results,
            [searchKey]: { hits: updatedHits, page }
        },
        isLoading: false
    }
}

export default class HackerNews extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '', // is used to store each result
            query: DEFAULT_QUERY,
            error: null,
            isLoading: false
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

        // revisited setState: use a function over an object 
        // when state depending on the previous state
        this.setState(updateSearchTopStoriesState(hits, page));
    }

    fetchSearchTopStories(query, page = 0) {
        this.setState({ isLoading: true });

        // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
        //     .then(function(response) {
        //         console.log('status', response.status);
        //         response.json().then(function(data) {
        //             console.log('fetch result:', data);
        //             debugger;
        //         }).catch(function(error) {
        //             console.log('fetch parsing error', error);
        //         })
        //     })

        // fetch with arrow functions    
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this._isMounted && this.setSearchTopStories(result))
            .catch(error => {
                this._isMounted && this.setState({ error });
            });
    }

    componentDidMount() {
        this._isMounted = true;

        const { query } = this.state;

        this.setState({
            searchKey: query,
            isLoading: false
        });
        this.fetchSearchTopStories(query);
    }
  
    componentWillUnmount() {
        this._isMounted = false;
    }

    onSearchChange(event) {
        const { value } = event.target;
        this.setState({ query: value }); // stored in local state
    }

    onSearchSubmit(event) {
        const { query } = this.state;
        this.setState({ searchKey: query })

        if (this.needsToSearchTopStories(query)) {
        this.fetchSearchTopStories(query);
        }

        event.preventDefault(); // suppress the native browser behavior
    }

    onDismiss(id) {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);

        // or can use Object.assign
        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            }
        });
    }

    render() {
        const { query, results, searchKey, error, isLoading } = this.state;

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

        // let list = (
        //     results &&
        //     results[searchKey] &&
        //     results[searchKey].hits
        // ) || [];
        // list = LIST;

        const errorMessage = 'no news from HackerNews API or there is no internet connection or smth went wrong';

        const PostListWithArchive = withArchiveHOC(PostsList);

        return (
            <BrowserRouter>
                <div className="page">
                    
                    <div className="message-time">
                        <p className="title">It's a time to have a coffee break and check you favourite topics</p>
                        <FontAwesomeIcon icon="coffee" />
                    </div>

                    <div className="interactions">
                        <SearchForm
                            value={query}
                            onChange={this.onSearchChange}
                            onSubmit={this.onSearchSubmit}>
                            you can search from HackerNews API &nbsp;
                        </SearchForm>
                    </div>

                    {error ?
                        <div className="error-message">{errorMessage}</div>
                        : <PostListWithArchive
                            list={list}
                            onDismiss={this.onDismiss} 
                            onArchive={this.onArchive}
                        /> 
                    }
                    
                    {/* <PostListWithArchive
                        list={list}
                        onDismiss={this.onDismiss}
                    /> */}

                    <div className="loading-wrap">
                        <ButtonWithLoading
                            isLoading={isLoading}
                            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                            More
                        </ButtonWithLoading>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}
