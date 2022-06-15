/*eslint-disable*/
import { useParams } from "react-router-dom";
import { Nav, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { addCount, minusCount, deleteCount } from "../store"

function Cart () {

  let cart = useSelector( state => state )
  let dispatch = useDispatch()

  return(
    <div>
<Table striped>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Count</th>
    </tr>
  </thead>
  <tbody>
    {
      cart.players.map((a, i) => 
          <tr key={i}>
          <td>{cart.players[i].id}</td>
          <td>{cart.players[i].name.split(' ')[0]}</td>
          <td>{cart.players[i].name.split(' ')[1]}</td>
          <td>{cart.players[i].count}</td>
          <button onClick={()=>{
            dispatch(addCount(cart.players[i].id));
            }}>+</button> 
          <button onClick={()=>{
            dispatch(minusCount(cart.players[i].id));
            }}>-</button> 
          <button onClick={(e)=>{
            dispatch(deleteCount(e.target.parentElement));
            console.log(e.target.parentElement)
          }}>삭제</button> 
        </tr>
        
      )
    }
    {/* <tr>
      <td>{cart.players[0].id}</td>
      <td>{cart.players[0].name.split(' ')[0]}</td>
      <td>{cart.players[0].name.split(' ')[1]}</td>
      <td>{cart.players[0].count}</td>
    </tr>
    <tr>
      <td>{cart.players[1].id}</td>
      <td>{cart.players[1].name.split(' ')[0]}</td>
      <td>{cart.players[1].name.split(' ')[1]}</td>
      <td>{cart.players[1].count}</td>
    </tr> */}


  </tbody>
</Table>
    </div>
  )
}

export default Cart;