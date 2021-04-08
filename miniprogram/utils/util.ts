const sumBy = require('./lodash/sumby.js');

export const sumSize = (sizes: string[]) => sumBy(sizes, (size: string) => parseFloat(size));
