import React, {PropTypes, Component} from 'react';

// Used to cancel events.
var preventDefault = event => event.preventDefault();

export default class Pagination extends Component {
  shouldComponentUpdate(nextProps) {
    const props = this.props;

    return props.totalPages !== nextProps.totalPages ||
      props.currentPage !== nextProps.currentPage ||
      props.showPages !== nextProps.showPages;
  }

  onChangePage(pageNumber, event) {
    event.preventDefault();
    this.props.onChangePage(pageNumber);
  }

  render() {
    var {totalPages, showPages, currentPage} = this.props;

    if (totalPages === 0) {
      return null;
    }

    let diff = Math.floor(showPages / 2),
      start  = Math.max(currentPage - diff, 0),
      end    = Math.min(start + showPages, totalPages);

    if (totalPages >= showPages && end >= totalPages) {
      start = totalPages - showPages;
    }

    let buttons = [], btnEvent, isCurrent;

    for (let i = start; i < end; i++) {
      isCurrent = currentPage === i;
      // If the button is for the current page then disable the event.
      if (isCurrent) {
        btnEvent = preventDefault;
      } else {
        btnEvent = this.onChangePage.bind(this, i);
      }

      buttons.push(
        <li key={i} className={`page-item ${isCurrent ? 'active' : null}`}>
          <a className="page-link" role="button" href="#" onClick={btnEvent} tabIndex="0">
            <span>{i + 1}</span>
          </a>
        </li>
      );
    }

    // First and Prev button handlers and class.
    let firstHandler = preventDefault;
    let prevHandler  = preventDefault;
    let isNotFirst   = currentPage > 0;

    if (isNotFirst) {
      firstHandler = this.onChangePage.bind(this, 0);
      prevHandler  = this.onChangePage.bind(this, currentPage - 1);
    }

    // Next and Last button handlers and class.
    let nextHandler = preventDefault;
    let lastHandler = preventDefault;
    let isNotLast   = currentPage < totalPages - 1;

    if (isNotLast) {
      nextHandler = this.onChangePage.bind(this, currentPage + 1);
      lastHandler = this.onChangePage.bind(this, totalPages - 1);
    }

    buttons = [
      <li key="prev" className={`page-item ${!isNotFirst ? 'disabled' : ''}`}>
        <a className="page-link"
           role="button"
           href="#"
           tabIndex="0"
           onClick={prevHandler}
           aria-disabled={!isNotFirst}
           aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
    ].concat(buttons);

    buttons = buttons.concat([
      <li key="next" className={`page-item ${!isNotLast ? 'disabled' : ''}`}>
        <a className="page-link"
          role="button"
           href="#"
           tabIndex="0"
           onClick={nextHandler}
           aria-disabled={!isNotLast}
           aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    ]);

    return (
      <ul className={this.props.className} aria-label="Pagination">
        {buttons}
      </ul>
    );
  }
}

Pagination.defaultProps = {showPages: 5};

Pagination.propTypes = {
  onChangePage : PropTypes.func.isRequired,
  totalPages   : PropTypes.number.isRequired,
  currentPage  : PropTypes.number.isRequired,
  showPages    : PropTypes.number
};