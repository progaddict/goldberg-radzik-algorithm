'use strict';

import * as d3 from 'd3';

import * as parser from './parser.js';

console.log('app is running');
console.log(parser.x);
d3.select('body').append('p').text('New paragraph!');
