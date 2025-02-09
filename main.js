// import { dataExample as JSONdata } from './tests/data/big';
import jsonData from './tests/data/big.json';
// import { defaultSettings as settings } from './tests/data/settings';
import { generate, transform } from './src/api';
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
  root: ['application_data', 'applicant_data'],
  isFormatKeys: true,
  boolAppearence: ['Yes', 'No'],
  // nullAppearence: '---',
  hideEmpty: true,
  isMergeSingleFields: true,
  showNotifications: true,
  // hidePropertyByKey: ['ToBeDefined', 'Bespoke'],
  arraysAsTable: ['applicant_data', 'address'],
};

generate(jsonData, root, settings);
// console.log('JSONdata', JSONdata);
// console.log(transform(JSON.parse(JSONdata), settings));
