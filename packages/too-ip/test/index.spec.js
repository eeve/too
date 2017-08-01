'use strict';

const ip = require('../src');

const query = ip.create();

it('should query', () => {
  expect(query.btreeSearchSync('114.114.114.114')).toMatchSnapshot();
  expect(query.btreeSearchSync('8.8.8.8')).toMatchSnapshot();
});

it('binarySearch', () => {
  expect(query.binarySearchSync('216.58.200.238')).toMatchSnapshot();
  expect(query.binarySearchSync('204.79.197.200')).toMatchSnapshot();
});
