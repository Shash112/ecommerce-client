import React, { useContext, useState } from 'react';
import LoginIcon from '../assest/assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleChange = (e) => {
    const { name, value} = e.target;

    setData((prev) => (
      {
        ...prev,
        [name] : value
      }
    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const dataResponse = await fetch(SummaryApi.login.url, {
      method: SummaryApi.login.method,
      credentials: 'include',
      headers: {
        'content-type' : 'application/json',
      },
      body: JSON.stringify(data)
    });

    const apiData = await dataResponse.json();

    if(apiData.success) {
      toast.success(apiData.message);
      navigate('/');
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if(apiData.error) {
      toast.error(apiData.message);
    }
  }

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          
          <div className='w-20 h-20 mx-auto'>
            <img src={LoginIcon} alt='Login icon' />
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div>
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
                <input type='email' required placeholder='Enter email' name='email' value={data.email} onChange={handleChange} className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex items-center '>
                <input type={ showPassword ? 'text' : 'password' } required name='password' placeholder='Enter password' value={data.password} onChange={handleChange} className='w-full h-full outline-none bg-transparent'/>
                <div className='cursor-pointer' onClick={()=>setShowPassword((prev)=> !prev)}>
                  <span>
                    { showPassword ? <FaEyeSlash /> : <FaEye /> }
                  </span>
                </div>
              </div>
            </div>
            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline text-red-600 hover:text-red-700'>
              Forgot password ?
            </Link>
            <button className='bg-red-600 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
          </form>
          <p className='py-4'>Don't have account ? <Link to={'/sign-up'} className='text-red-600 hover:underline hover:text-red-700'>Sign up</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login