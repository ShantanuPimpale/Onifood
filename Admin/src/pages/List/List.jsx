/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import './List.css'

const List = ({url}) => {
  
  const [list, setlist] = useState([]);
  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setlist(response.data.data);
    }else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId)=>{
    const responce  = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(responce.data.success){
      toast.success(responce.data.message);
      }else{
        toast.error("Error")
        
  }
}

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col' >
       <p>All foods list</p>
       <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            </div>
          )
        })}
       </div>
    </div>
  )
}

export default List