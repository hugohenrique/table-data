import React      from 'react';
import ReactDOM   from 'react-dom';
import TableData  from '../src/table-data';
import DataSource from '../src/table-data-source';

let renderEmail = (value, row) => {
  return <a href={`mailto:${row['email']}`}>Send message</a>;
};

const columns = [
  {title: 'ID', prop: 'id', width: '60px', sortable: true},
  {title: 'Name', prop: 'name', sortable: true},
  {title: 'Image', prop: 'image.title'}
];

const dataSource = new DataSource([
  {
    id: 1,
    name: 'Foo',
    image: {
      src   : "http://icon-icons.com/icons2/577/PNG/256/ExecutiveCar_Black_icon-icons.com_54904.png",
      title : "Carro"
    }
  },
  {
    id: 2,
    name: 'Bar',
    image: {}
  },
  {
    id: 3,
    name: 'Baz',
    image: {}
  }
]);

ReactDOM.render(
  <TableData
    columns={columns}
    dataSource={dataSource}
    sortBy={{prop: 'id', order: 'ascending'}}
  />,
  document.querySelector('#table-data')
);
