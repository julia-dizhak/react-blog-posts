export default function byQuery(query) {
    return function(item) {
      return !query || item.title.toLowerCase().includes(query.toLowerCase());
    }
}
