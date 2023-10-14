import React from 'react'


const ListGroup = ({items, onItemSelect, id, value, selectedItem}) => {
  items = [{_id:0, name:'All Genre'}, ...items];
  
  return <div>
    <ul className="list-group">
      {items.map( item => <li key={item[id]} className={item[value]==selectedItem?"list-group-item active":"list-group-item"} onClick={()=>onItemSelect(item[value])}>{item[value]}</li>)}
    </ul>
  </div>
}


export default ListGroup


ListGroup.defaultProps = {
  id:'_id',
  value:'name'
}
