import React          from 'react';
import Table          from './table';
import TableDataMixin from './mixin';
import Pagination     from './pagination';
import SearchField    from './search-field';

export default React.createClass({
  mixins: [TableDataMixin],
  render() {
    const page = this.buildPage();
    return (
      <div className={this.props.className}>
        {this.props.searchField.visible && (
          <SearchField
            id="search-field"
            label={this.props.searchField.label}
            value={this.state.filterValues.globalSearch}
            onChange={this.onFilter.bind(this, 'globalSearch')}/>
        )}
        <Table
          className="table table-bordered"
          columns={this.props.columns}
          dataSource={page.dataSource}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
          noData={this.props.noData}
        />
        {this.props.pagination.visible && (
          <Pagination
            className="pagination"
            currentPage={page.currentPage}
            totalPages={page.totalPages}
            onChangePage={this.onChangePage}/>
        )}
      </div>
    );
  }
});
