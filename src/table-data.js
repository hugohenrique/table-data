import React       from 'react';
import DataManager from './data-manager';
import Table       from './table';
import Pagination  from './pagination';
import SearchField from './search-field';

let DataTable = React.createClass({
  mixins: [DataManager],

  render() {
    let page = this.buildPage();

    return (
      <div className={this.props.className}>
        <SearchField
          id="search-field"
          label="Search:"
          value={this.state.filterValues.globalSearch}
          onChange={this.onFilter.bind(this, 'globalSearch')}
        />
        <Table
          className="table table-bordered"
          dataSource={page.dataSource}
          columns={this.props.columns}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
        />
        <Pagination
          className="pagination"
          currentPage={page.currentPage}
          totalPages={page.totalPages}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
});

export default DataTable;