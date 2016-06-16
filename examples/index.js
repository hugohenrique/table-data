import React      from 'react';
import ReactDOM   from 'react-dom';
import TableData  from '../src/table-data';
import DataSource from '../src/table-data-source';

let imageRender = (value) => {
  if (undefined === value['src']) {
    return null;
  }

  return <img src={value['src']} />;
};

const columns = [
  {
    title    : 'ID',
    prop     : 'id',
    width    : '60px',
    sortable : true
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
  />,
  document.querySelector('#table-data')
);
