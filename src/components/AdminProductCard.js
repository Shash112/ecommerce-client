import React, { useState } from 'react'
import displayCurrency from '../helpers/displayCurrency'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditproductCard from './AdminEditproductCard';

const AdminProductCard = ({data, fetchData}) => {
    const [editProduct, setEditProduct] = useState(false)

    return (
    <div className='bg-white p-4 rounded'>
        <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data?.productImage[0]} className='mx-auto object-fill h-full' alt={data?.productName}/>
            </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
            <div>
                <p className='font-semibold'>{displayCurrency(data.sellingPrice)}</p>
                <div onClick={()=>setEditProduct(true)} className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'>
                    <MdModeEditOutline />
                </div>
            </div>
        </div>
        {
            editProduct && (
                <AdminEditproductCard productData={data} onClose={()=>{setEditProduct(false)}} fetchData={fetchData}/>
            )
        }
    </div>
  )
}

export default AdminProductCard