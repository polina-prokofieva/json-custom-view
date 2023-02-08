export const emptyJson = '{}';

export const invalidJson = 'invalid';

export const jsonObjectOfStrings = `{
  "reportDate": "082120",
  "reportTime": "113636",
  "preamble": "TRSM",
  "versionNo": "07",
  "mKeywordLength": "10",
  "mKeywordText": "TEST082020",
  "y2kReportedDate": "08212020"
}`;

export const jsonObjectOfBoolians = `{
  "first": true,
  "second": false,
  "third": true,
  "fourth": "something else"
}`;

export const jsonSimpleExample = `{
  "something": true,
  "headerRecord": [
    {
    "reportDate": "082120",
    "reportTime": "113636",
    "preamble": "TRSM",
    "versionNo": "07",
    "mKeywordLength": "10",
    "mKeywordText": "TEST082020",
    "y2kReportedDate": "08212020"
    }
  ]
}`;

export const jsonOneLevel = `{
  "first": true,
  "second": false,
  "third": true,
  "fourth": "something else",
  "fifth": null,
  "sixth": false,
  "seventh": "string",
  "eighth": null,
  "ninth": 0,
  "tenth": "zero"
}`;

export const jsonTwoLevels = `{
  "first": true,
  "second": false,
  "third": {
    "p1": 123,
    "p2": null,
    "p3": false,
    "p4": 0,
    "p5": "zero",
    "p6": "something else"
  },
  "fourth": 123456,
  "fifth": {
    "first": true,
    "second": false,
    "third": true,
    "fourth": "something else",
    "fifth": null,
    "sixth": false,
    "seventh": "string",
    "eighth": null,
    "ninth": 0,
    "tenth": "zero"
  },
  "sixth": "normal value"
}`;
