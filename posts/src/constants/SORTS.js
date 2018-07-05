import { sortBy } from 'lodash';

export const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title')
};
  