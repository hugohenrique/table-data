let containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();

  return b.indexOf(a) >= 0;
};

function buildInitialState(props) {
  return {
    dataSource   : props.dataSource.slice(0),
    sortBy       : props.sortBy,
    filterValues : {},
    currentPage  : 0,
    pageSize     : props.pageSize
  };
}

export default {
  getInitialState() {
    return buildInitialState(this.props);
  },

  getDefaultProps() {
    return {
      pageSize: 10,
      pageSizeOptions: [5, 10, 20],
      filters: {
        globalSearch: {filter: containsIgnoreCase}
      }
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState(buildInitialState(nextProps));
  },

  componentWillMount() {
    var {sortBy, dataSource} = this.state;

    if (sortBy) {
      this.setState({dataSource: dataSource.sort(sortBy)});
    }
  },

  onSort(sortBy) {
    const {dataSource} = this.state;

    this.setState({
      sortBy     : sortBy,
      dataSource : dataSource.sort(sortBy)
    });
  },

  onFilter(filterName, filterValue) {
    let {filterValues, sortBy} = this.state;
    let {dataSource, filters}  = this.props;

    filterValues[filterName] = filterValue;

    var newData = dataSource.filter(filters, filterValues);

    this.setState({
      dataSource   : newData.sort(sortBy),
      filterValues : filterValues,
      currentPage  : 0
    });
  },

  buildPage() {
    let {currentPage, pageSize, dataSource} = this.state;
    let startAt = pageSize * currentPage;

    return {
      dataSource  : dataSource.slice(startAt, startAt + pageSize),
      currentPage : currentPage,
      totalPages  : Math.ceil(dataSource.rows().length / pageSize)
    };
  },

  onChangePage(pageNumber) {
    this.setState({currentPage: pageNumber});
  },

  onPageSizeChange(value) {
    let newPageSize = +value;
    let {currentPage, pageSize} = this.state;
    let newPage = Math.floor((currentPage * pageSize) / newPageSize);

    this.setState({
      pageLength  : newPageSize,
      currentPage : newPage
    });
  }
};