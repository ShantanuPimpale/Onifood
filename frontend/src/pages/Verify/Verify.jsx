/* eslint-disable no-unused-vars */
import  { useContext, useEffect } from 'react';
import './Verify.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';


const Verify = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment=async()=>{
    const response = await axios.post(`https://onifood-project.netlify.app/api/order/verify`,{success,orderId});
    if(response.data.success){
        navigate("/myorders")
    }else{
        navigate("/");
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[])

  return (
    <div className='verify'>
      <div className="spinner">
        {/* Spinner content goes here */}
      </div>
    </div>
  );
}

export default Verify;
