import React from 'react';
import Pagination from 'react-bootstrap/Pagination'
import Spinner from 'react-bootstrap/Spinner'

function PaginationButtons(props) {
  let lastpage = (props.lastPage ? props.lastPage : 1)
  let items = [];
  for (let number = 1; number <= lastpage; number++) {
    items.push(
        <Pagination.Item key={number} active={number === props.pageNumber} onClick={() => props.setPageNumber(number)}>
          {number}
        </Pagination.Item>,
      );

  }

  return (
    <div className='d-flex justify-content-between align-items-center'>
      <Pagination className='mb-0'>
        {props.pageNumber !== 1 ? <Pagination.First onClick={() => props.setPageNumber(1)} /> : <Pagination.First disabled />}
        {props.pageNumber !== 1 ? <Pagination.Prev onClick={() => props.setPageNumber(props.pageNumber - 1)} /> : <Pagination.Prev disabled />}

        {props.loadingData ? <Pagination.Item><Spinner animation="grow" variant="light" /></Pagination.Item>: items}

        {(props.pageNumber !== 1 && props.pageNumber !== lastpage) ? <Pagination.Next onClick={() => props.setPageNumber(props.pageNumber + 1)} /> : <Pagination.Next disabled />}
        {(props.pageNumber !== 1 && props.pageNumber !== lastpage) ? <Pagination.Last onClick={() => props.setPageNumber(lastpage)} /> : <Pagination.Last disabled />}
      </Pagination>
    </div>
  );
}

export default PaginationButtons;