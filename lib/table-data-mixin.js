'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var containsIgnoreCase = function containsIgnoreCase(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();

  return b.indexOf(a) >= 0;
};

function buildInitialState(props) {
  return {
    dataSource: props.dataSource.slice(0),
    sortBy: props.sortBy,
    filterValues: {},
    currentPage: 0,
    pageSize: props.pageSize
  };
}

exports.default = {
  getInitialState: function getInitialState() {
    return buildInitialState(this.props);
  },
  getDefaultProps: function getDefaultProps() {
    return {
      pageSize: 10,
      pageSizeOptions: [5, 10, 20],
      filters: {
        globalSearch: { filter: containsIgnoreCase }
      }
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(buildInitialState(nextProps));
  },
  componentWillMount: function componentWillMount() {
    var _state = this.state;
    var sortBy = _state.sortBy;
    var dataSource = _state.dataSource;


    if (sortBy) {
      this.setState({ dataSource: dataSource.sort(sortBy) });
    }
  },
  onSort: function onSort(sortBy) {
    var dataSource = this.state.dataSource;


    this.setState({
      sortBy: sortBy,
      dataSource: dataSource.sort(sortBy)
    });
  },
  onFilter: function onFilter(filterName, filterValue) {
    var _state2 = this.state;
    var filterValues = _state2.filterValues;
    var sortBy = _state2.sortBy;
    var _props = this.props;
    var dataSource = _props.dataSource;
    var filters = _props.filters;


    filterValues[filterName] = filterValue;

    var newData = dataSource.filter(filters, filterValues);

    this.setState({
      dataSource: newData.sort(sortBy),
      filterValues: filterValues,
      currentPage: 0
    });
  },
  buildPage: function buildPage() {
    var _state3 = this.state;
    var currentPage = _state3.currentPage;
    var pageSize = _state3.pageSize;
    var dataSource = _state3.dataSource;

    var startAt = pageSize * currentPage;

    return {
      dataSource: dataSource.slice(startAt, startAt + pageSize),
      currentPage: currentPage,
      totalPages: Math.ceil(dataSource.rows().length / pageSize)
    };
  },
  onChangePage: function onChangePage(pageNumber) {
    this.setState({ currentPage: pageNumber });
  },
  onPageSizeChange: function onPageSizeChange(value) {
    var newPageSize = +value;
    var _state4 = this.state;
    var currentPage = _state4.currentPage;
    var pageSize = _state4.pageSize;

    var newPage = Math.floor(currentPage * pageSize / newPageSize);

    this.setState({
      pageLength: newPageSize,
      currentPage: newPage
    });
  }
};