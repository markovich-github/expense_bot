const paginate = (items, currentPage, pageSize) => {
    return items.slice((currentPage-1)*pageSize, currentPage*pageSize);
}
 
export default paginate;
