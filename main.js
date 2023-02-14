import { dataExample as JSONdata } from './tests/data/big';
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
  root: '',
  isFormatKeys: true,
  boolAppearence: ['Yes', 'No'],
  // nullAppearence: '---',
  hideEmpty: true,
  isMergeSingleFields: true,
  showNotifications: true,
  hidePropertyByKey: ['ToBeDefined', 'Bespoke'],
  arraysAsTable: ['applicant_data', 'address'],
};

generate(JSONdata, root, settings);
// console.log('JSONdata', JSONdata);
// console.log(transform(JSON.parse(JSONdata), settings));
