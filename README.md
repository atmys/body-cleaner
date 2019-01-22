# Body-cleaner

[![Build Status](https://travis-ci.org/atmys/body-cleaner.svg?branch=master)](https://travis-ci.org/atmys/body-cleaner)
[![Coverage Status](https://coveralls.io/repos/github/atmys/body-cleaner/badge.svg)](https://coveralls.io/github/atmys/body-cleaner)
[![Known Vulnerabilities](https://snyk.io/test/github/atmys/body-cleaner/badge.svg?targetFile=package.json)](https://snyk.io/test/github/atmys/body-cleaner?targetFile=package.json)
[![CodeFactor](https://www.codefactor.io/repository/github/atmys/body-cleaner/badge)](https://www.codefactor.io/repository/github/atmys/body-cleaner)

Very simple sanitizer to clean client-submitted data before you deal with it server-side. It iterates through objects & arrays to remove html & script tags, $ keys & everything that is not a string, a number, a date or a boolean.

## Getting Started

### Install

```console
npm i --save body-cleaner
```

### API

#### `object(unsafe, options)`
- `options <Object>` :
  - `ignoreKeys <Array>` : array of keys to ignore. Will ignore theses keys on all level.
- returns `safe <Object>`
#### `string(unsafe)`
- returns `safe <String>`
#### `boolean(unsafe)`
- returns `safe <Boolean>`

### Usage

Test it on [RunKit](https://runkit.com/atmys/body-cleaner).

```js
const { object } = require('body-cleaner');

const newDate = new Date();
const dirty = {
  $bad: 'very bad',
  safe: 'safe',
  count: [1, new Error(), 'it is <script>alert("un")</script>safe'],
  date: newDate
};

const clean = object(dirty);

// clean = {
//   safe: 'safe',
//   count: [1, undefined, 'it is safe'],
//   date: newDate
// }
```
