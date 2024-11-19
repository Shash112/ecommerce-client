import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import { setUserDetails } from './store/userSlice';
import Context from './context';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async() => {
    const response = await fetch(SummaryApi.currentUser.url, {
      method: SummaryApi.currentUser.method,
      credentials: 'include'
    })

    const responseData = await response.json();

    if(responseData.success){
      dispatch(setUserDetails(responseData.data[0]))
    }
  }

  const fetchUserAddToCart = async () => {
    const response = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })

    const responseData = await response.json();

    setCartProductCount(responseData?.data?.count)
  }

  useEffect(() => {
    fetchUserDetails()
    fetchUserAddToCart()
  }, [])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        fetchUserAddToCart,
        cartProductCount
      }}>
        <ToastContainer  position='top-center'/>
        <Header />
          <main className='min-h-[calc(100vh-120px)] pt-16'>
            <Outlet />
          </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
