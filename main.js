// import { dataExample as JSONdata } from './data/big';
import { responseJson } from './tests/data/response';
// import { defaultSettings as settings } from './tests/data/settings';
import { generate, transform } from './src/api.js';
// import { data } from './data/realDataRestricted';

const root = document.querySelector('#main');
const data = {
  Bespoke: {
    ToBeDefined: [
      {
        name: 'Harry',
        surname: 'Potter',
      },
      {
        name: 'Hermiona',
        surname: 'Grainger',
      },
    ],
  },
  somevalue: null,
};

const settings = {
  root: 'Bespoke',
  isFormatKeys: true,
  boolAppearence: ['Yes', 'No'],
  // nullAppearence: '---',
  hideEmpty: true,
  isMergeSingleFields: true,
  showNotifications: true,
  arraysAsTable: ['ToBeDefined', 'trades', 'inquiries'],
};

generate(data, root, settings);
console.log(transform(data, settings));
