import React from 'react'
import {BiSolidDownArrow, BiSolidUpArrow} from 'react-icons/bi'


const ArrowIcon = ({order}) => {
  if(order=='asc') return <BiSolidDownArrow />
  else return <BiSolidUpArrow />
}


export default ArrowIcon