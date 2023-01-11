import { describe, expect } from '@jest/globals';
import { transform } from '../../src/transform';
import { defaultSettings } from '../../src/defaultSettings';
import { setSettings } from '../../src/api';

const settingsHide = {
  ...defaultSettings,
  hideEmpty: true,
};

const settingsShow = {
  ...defaultSettings,
  hideEmpty: false,
};

describe('Hide {} and []: One level', () => {
  it('Empty object', () => {
    const data01 = {
      first: {},
      seconds: 0,
    };

    setSettings(settingsHide);
    expect(transform(data01)).toStrictEqual({
      seconds: 0,
    });

    setSettings(settingsShow);
    expect(transform(data01)).toStrictEqual(data01);
  });

  it('Empty array', () => {
    const data01 = {
      first: [],
      seconds: 0,
    };

    setSettings(settingsHide);
    expect(transform(data01)).toStrictEqual({
      seconds: 0,
    });

    setSettings(settingsShow);
    expect(transform(data01)).toStrictEqual(data01);
  });

  it('Empty array', () => {
    const data01 = {
      first: {},
      seconds: null,
      third: [],
      fourth: '234',
    };

    setSettings(settingsHide);
    expect(transform(data01)).toStrictEqual({
      seconds: null,
      fourth: '234',
    });

    setSettings(settingsShow);
    expect(transform(data01)).toStrictEqual(data01);
  });
});

describe('Hide {} and []: deep', () => {
  const data01 = {
    first: [[]],
    second: 2,
  };

  const data02 = {
    first: [[], [], []],
    second: 0,
  };

  const data03 = {
    first: [null, 0, [], {}],
    second: 6,
  };

  const data04 = {
    first: [[[[], []], [], []]],
    second: 777,
  };

  const settingsWithHideNulls = {
    ...settingsHide,
    hidePropertiesByValue: [null, 0],
  };

  it('Hide empty arrays (deep)', () => {
    setSettings(settingsHide);
    expect(transform(data01)).toStrictEqual({ second: 2 });
    expect(transform(data02)).toStrictEqual({ second: 0 });
    expect(transform(data03)).toStrictEqual({
      first: [null, 0],
      second: 6,
    });

    expect(transform(data04)).toStrictEqual({ second: 777 });

    setSettings(settingsWithHideNulls);
    expect(transform(data03)).toStrictEqual({
      second: 6,
    });
  });

  const data05 = {
    first: [
      {},
      [],
      {
        key: [[], {}],
      },
    ],
    second: {
      key: {
        key: {
          key: {},
        },
      },
    },
    third: 123,
  };

  const data06 = {
    first: [
      null,
      0,
      {
        key: null,
        key2: {
          key: [null, {}],
        },
      },
    ],
    second: 5,
  };

  it('Hide empty objects and array (deep)', () => {
    setSettings(settingsHide);
    expect(transform(data05, settingsHide)).toStrictEqual({
      third: 123,
    });
    expect(transform(data06, settingsHide)).toStrictEqual({
      first: [null, 0, { key: null, key2: { key: [null] } }],
      second: 5,
    });

    setSettings(settingsWithHideNulls);
    expect(transform(data06, settingsWithHideNulls)).toStrictEqual({
      second: 5,
    });
  });
});
