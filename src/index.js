import React, {Component, PropTypes} from 'react';
import ReactDOM   from 'react-dom';
import TableData  from './table-data';
import DataSource from './table-data-source';

let renderEmail = (value, row) => {
  return <a href={`mailto:${row['email']}`}>Send message</a>;
};

const columns = [
  {title: 'ID', prop: 'id', width: '20px'},
  {title: 'Name', prop: 'name'},
  {title: 'E-mail', prop: 'email', render: renderEmail}
];

const source = new DataSource([
  {id: 1, name: 'Foo', email: 'foo@bar.com'},
  {id: 2, name: 'Bar', email: 'bar@foo.com'},
  {id: 3, name: 'Baz', email: 'baz@bar.com'}
]);

ReactDOM.render(
  <TableData
    columns={columns}
    dataSource={source}
    sortBy={{prop: 'id', order: 'ascending'}}
  />,
  document.querySelector('#table-data')
);
