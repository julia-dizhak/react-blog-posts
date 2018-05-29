# Blog posts
simple blog with a posts build by react using [HackerNews API](https://github.com/HackerNews/API)

from book Road to react, author Robin Wieruch
demo is https://julia-dizhak.github.io/react-blog-posts/posts/demo/

## Posts
* render posts from const and from [HackerNews API](https://hn.algolia.com/api/v1/search?query=redux)
* remove post
* filter for titles in post
* submit filtered posts
* to archive a post in the list
* able to search different HackerNews stories (no client-side search anymore)
* paginated fetch: concatenate old and new list of hits from the local state and new result object

## TODO 
* should onSubmit hanlder be inside SearchForm?
* onClick clear button inside search - update posts 
* works together onSearch and onSubmit for search input

## Technology

### React
* use this.state and setState() to manage your internal component state
* use forms and events in React to add interactions
* unidirectional data flow
* embrace controlled components (input)
* compose components with children and reusable components
* usage and implementation of ES6 class components and functional stateless components
* approaches to style your components

### JS
* fetch - an asynchronous request to an API

