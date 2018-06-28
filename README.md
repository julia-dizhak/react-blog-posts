# Blog posts build be React
render a list with a posts using [HackerNews API](https://github.com/HackerNews/API)

from book Road to react, author Robin Wieruch

demo is https://julia-dizhak.github.io/react-blog-posts/posts/demo/

## Posts 
* render posts from [HackerNews API](https://hn.algolia.com/api/v1/search?query=redux)
* posibility to remove post
* filter for titles in post
* submit filtered posts
* to archive a post in the list
* able to search different HackerNews stories (no client-side search anymore)
* paginated fetch: concatenate old and new list of hits from the local state and new result object
* client cache: client makes a request to the API only once for repeated search query(search term)
* error handling: in case of errors from API request with catch and ErrorBoundary -> componentDidCatch()

### TODO 
* update design (more fancy), increase search button font-size
* add Loader (with blue color)
* check hackerNews color primary
* target blank attribute to news
* increase article title
* support basic mobile
* when you remove animation to add
* button more styles
* hackernews favicon
* describe Props, defaultProps

* axios check
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

### Testing
* Snapshot tests usually stay pretty basic. You only want to cover that the component doesn’t change its output. Once it changes the output, you have to decide if you accept the changes. Otherwise you have to fix the component when the output is not the desired output.

* Enzyme is a testing utility by Airbnb to assert, manipulate and traverse your React components. You can use it to conduct unit tests to complement your snapshot tests in React.