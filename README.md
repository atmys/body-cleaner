# Body-cleaner

Very simple sanitizer to clean client-submitted data before you deal with it server-side. It iterates through objects & arrays to remove html & script tags, $ keys & everything that is not a string, a number, a date or a boolean.

## Getting Started

### Install

```
npm i --save body-cleaner
```

### API

#### `object(unsafe)`
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
  count: [1, new Error(), 'it is not <script>alert("safe")</script>'],
  date: newDate
};

const clean = object(dirty);

// clean = {
//   safe: 'safe',
//   count: [1, undefined, 'it is not'],
//   date: newDate
// }
```
