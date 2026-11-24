import jsonData from './tests/data/big.json';
// import { defaultSettings as settings } from './tests/data/settings';
import { generate, transform } from './src/api';

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
  root: '',
  isFormatKeys: true,
  boolAppearence: ['Yes', 'No'],
  // nullAppearence: '---',
  hideEmpty: true,
  isMergeSingleFields: true,
  showNotifications: true,
  keysForArrays: {'': 'city'},
  // hidePropertyByKey: ['ToBeDefined', 'Bespoke'],
  // arraysAsTable: [''],
};

generate(jsonData, root, settings);
// console.log('JSONdata', JSONdata);
// console.log(transform(JSON.parse(JSONdata), settings));
