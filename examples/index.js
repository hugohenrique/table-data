import React      from 'react';
import ReactDOM   from 'react-dom';
import {TableData, DataSource} from '../dist/bundle.js';

let imageRender = (value) => {
  if (undefined === value['src']) {
    return null;
  }
  return (<img src={value['src']} />);
};

const columns = [
  {
    title    : 'ID',
    prop     : 'id',
    sortable : true,
    style: {
      width: '60px',
    }
  },
  {
    title    : 'Name',
    prop     : 'name',
    sortable : true
  },
  {
    title    : 'Image',
    prop     : 'image.title',
    sortable : false
    /* render: imageRender */
  },
  {
    title : 'Customized',
    prop  : null,
    render: (row) => {
      console.log(row);
    }
  }
];

const dataSource = new DataSource([
  {
    id: 1,
    name: 'Foo',
    image: {
      src   : 'http://icon-icons.com/icons2/577/PNG/256/ExecutiveCar_Black_icon-icons.com_54904.png',
      title : 'Carro'
    }
  },
  {
    id: 2,
    name: 'Bar',
    image: {
      src   : 'test',
      title : 'foobar'
    }
  },
  {
    id: 3,
    name: 'Baz',
    image: {
      src   : 'test',
      title : 'barfoo'
    }
  }
]);

ReactDOM.render(
  <TableData
    columns={columns}
    dataSource={dataSource}
    sortBy={{prop: 'id', order: 'ascending'}}
    searchField={{label: 'Searchable', visible: true}}
    pagination={{visible: true}}
    noData="Without data"
  />,
  document.querySelector('#table-data')
);
