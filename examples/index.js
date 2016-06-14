import React, {Component, PropTypes} from 'react';
import ReactDOM   from 'react-dom';
import TableData  from '../src/table-data';
import DataSource from '../src/table-data-source';

let renderEmail = (value, row) => {
  return <a href={`mailto:${row['email']}`}>Send message</a>;
};

const columns = [
  {title: 'ID', prop: 'id', width: '60px', sortable: true},
  {title: 'Name', prop: 'name', sortable: true},
  {title: 'E-mail', prop: 'email', render: renderEmail}
];

const dataSource = new DataSource([
  {id: 1, name: 'Foo', email: 'foo@bar.com'},
  {id: 2, name: 'Bar', email: 'bar@foo.com'},
  {id: 3, name: 'Baz', email: 'baz@bar.com'}
]);

ReactDOM.render(
  <TableData
    columns={columns}
    dataSource={dataSource}
    sortBy={{prop: 'id', order: 'ascending'}}
  />,
  document.querySelector('#table-data')
);
