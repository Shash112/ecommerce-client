import React, { useContext, useState } from 'react';
import logo from '../assest/assest/logo1.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import Context from '../context'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/role'

const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logoutUser.url, {
      method: SummaryApi.logoutUser.method,
      credentials: 'include'
    })

    const data = await fetchData.json()
    console.log(data)
    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/')
    }
    
    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if(value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate(`/search`)
    }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to={"/"}>
          <img src={logo} alt='logo1' height={90} width={40} className='scale-150'/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='Search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <BsSearch />
          </div>
        </div>
 
        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                    ) : (
                      <FaRegUserCircle />
                    )
                  }
              </div>
              )
            }
            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                      
                      <>
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev=>!prev)}>Admin Panel</Link>
                        <Link to={"/my-orders"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev=>!prev)}>My Orders</Link>
                      </>
                        
                      )
                    }
                  </nav>
                </div>
              )
            }
          </div>
            {
              user?._id && (
                <Link to={'/cart'} className='text-2xl relative'>
                  <span><FaShoppingCart /></span>
                  <div className='bg-red-600 w-5 h-5 p-1 flex justify-center items-center rounded-full absolute -top-2 -right-2'>
                    <p className='text-sm'>{context?.cartProductCount}</p>
                  </div>
                </Link>
              )
            }
          


          <div >
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              ) : (
                <Link to={"/login"} className='bg-red-600 px-3 py-1 rounded-full hover:bg-red-700'>Login</Link>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header