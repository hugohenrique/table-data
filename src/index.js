import React, {Component, PropTypes} from 'react';
import ReactDOM   from 'react-dom';
import TableData  from './table-data';
import DataSource from './table-data-source';

let source = new DataSource({
  columns : [
    {property: 'id', label: 'ID'},
    {property: 'name', label: 'Name'},
    {property: 'year', label: 'Year'}
  ],
  rows : [
    {id: 1, name: 'Foo', year: 1990},
    {id: 2, name: 'Bar', year: 2000},
    {id: 3, name: 'Baz', year: 2010}
  ]
});

ReactDOM.render(
  <TableData
    dataSource={source}
    sortBy={{property: 'id', order: 'ascending'}}
  />,
  document.querySelector('#words-table')
);
