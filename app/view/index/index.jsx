import React from 'react';
import ReactDOM from 'react-dom';
import { Ta } from './test';

ReactDOM.render(
  <Ta />,
  /* global document:false */
  /* eslint comma-dangle: 0 */
  document.getElementById('body')
);
