export const simple = {
  first: 123,
  second: false,
  third: true,
  fourth: null,
  fifth: 0,
  sixth: 'zero',
  seventh: false,
  eighth: 0,
  ninth: null,
  tenth: 'zero',
  eleventh: 'valid value',
};

export const twoLevelsData = {
  first: true,
  second: false,
  third: {
    p1: 123,
    p2: null,
    p3: false,
    p4: 0,
    p5: 'zero',
    p6: 'something else',
  },
  fourth: 123456,
  fifth: {
    first: true,
    second: false,
    third: true,
    fourth: 'something else',
    fifth: null,
    sixth: false,
    seventh: 'string',
    eighth: null,
    ninth: 0,
    tenth: 'zero',
  },
  sixth: 'normal value',
};

export const deep = {
  first: 123,
  second: false,
  third: {
    first: 123,
    second: false,
    third: {
      first: {
        first: 123,
        second: false,
        third: {
          first: {
            first: 123,
            second: {
              first: 123,
              second: false,
              third: {
                first: 123,
                second: false,
                third: true,
              },
            },
            third: true,
          },
          second: false,
          third: {
            first: {
              first: 123,
              second: false,
              third: true,
            },
            second: false,
            third: true,
          },
        },
      },
      second: false,
      third: true,
    },
  },
};

export const dataWithArray = {
  first: true,
  second: null,
  third: [123, null, false, 0, 'zero', 'something else'],
};

export const dataWithObjectsInArray = {
  id: 'sdkjfsjf20348',
  people: [
    {
      name: 'Polina',
      age: null,
      occupation: 'developer',
    },
    {
      name: 'Igor',
      age: 7,
      occupation: 'scholler',
    },
    {
      name: 'Yurij',
      age: null,
      occupation: null,
    },
  ],
};

export const optionsArray = {
  lbo_options: [
    {
      '@name': 'Running Boards',
      '@code': '137',
      '#text': '1000'
    },
    {
      '@name': 'w/o Leather Seats',
      '@code': '076',
      '#text': '-25'
    },
    {
      '@name': 'Luggage Rack',
      '@code': '043',
      '#text': '0'
    }
  ]
};
