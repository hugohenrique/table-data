import React, {Component, PropTypes} from 'react';
import ReactDOM   from 'react-dom';
import TableData  from './table-data';
import DataSource from './table-data-source';

const columns = [
  {title: 'ID', prop: 'id'},
  {title: 'Name', prop: 'name'},
  {title: 'Year', prop: 'year'}
];

const source = new DataSource([
  {id: 1, name: 'Foo', year: 1990},
  {id: 2, name: 'Bar', year: 2000},
  {id: 3, name: 'Baz', year: 2010}
]);

ReactDOM.render(
  <TableData
    columns={columns}
    dataSource={source}
    sortBy={{prop: 'id', order: 'ascending'}}
  />,
  document.querySelector('#table-data')
);
