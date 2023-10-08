import React from 'react'


const Pagination = ({totalItems, pageSize, onPagination, currentPage}) => {
    const totalPages = Math.ceil(totalItems/pageSize)
    let pages = [];
    for(let i=1; i<=totalPages;i++)
        pages.push(i)
     
  return <nav aria-label="Page navigation example">
  <ul className="pagination">
    {pages.map(page => <li className={page==currentPage?"page-item active":"page-item"} key={page}><a className="page-link" onClick={()=>onPagination(page)}>{page}</a></li>)}
  </ul>
</nav>
}


export default Pagination
