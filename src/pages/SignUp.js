import React, { useState } from 'react';
import LoginIcon from '../assest/assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { imageTobase64 } from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value} = e.target;

    setData((prev) => (
      {
        ...prev,
        [name] : value
      }
    ))
  }

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];

    const image = await imageTobase64(file);
    setData((prev) => (
      {
        ...prev,
        profilePic: image
      }
    ));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    
    if (data.password === data.confirmPassword) {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        navigate('/login');
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }



    } else {
      console.log("Please check the password");
    }
  }

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          
          <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
            <div>
              <img src={ data.profilePic || LoginIcon} alt='Login icon' />
            </div>
            <form>
              <label>
                <div className='text-xs pt-1 pb-4 bg-slate-300 text-center absolute w-full bottom-0 cursor-pointer hover:bg-slate-400' >
                  Upload Photo
                </div>
                  <input type='file' className='hidden' onChange={handleProfileUpload}/>
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div>
              <label>Name : </label>
              <div className='bg-slate-100 p-2'>
                <input type='text' required placeholder='Enter name' name='name' value={data.name} onChange={handleChange} className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div>
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
                <input type='email' required placeholder='Enter email' name='email' value={data.email} onChange={handleChange} className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex items-center '>
                <input type={ showPassword ? 'text' : 'password' } required name='password' placeholder='Enter password' value={data.password} onChange={handleChange} className='w-full h-full outline-none bg-transparent' autoComplete="new-password"/>
                <div className='cursor-pointer' onClick={()=>setShowPassword((prev)=> !prev)}>
                  <span>
                    { showPassword ? <FaEyeSlash /> : <FaEye /> }
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm password : </label>
              <div className='bg-slate-100 p-2 flex items-center '>
                <input type={ showConfirmPassword ? 'text' : 'password' } required name='confirmPassword' placeholder='Enter password' value={data.confirmPassword} onChange={handleChange} className='w-full h-full outline-none bg-transparent' autoComplete="new-password"/>
                <div className='cursor-pointer' onClick={()=>setShowConfirmPassword((prev)=> !prev)}>
                  <span>
                    { showConfirmPassword ? <FaEyeSlash /> : <FaEye /> }
                  </span>
                </div>
              </div>
            </div>
            
            <button className='bg-red-600 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Sing Up</button>
          </form>
          <p className='py-4'>Already have an account ? <Link to={'/login'} className='text-red-600 hover:underline hover:text-red-700'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp