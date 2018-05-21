export default function byArchived(archivedItems) {
    return function(item) {
      return !archivedItems.includes(item.objectID);
    }
}
