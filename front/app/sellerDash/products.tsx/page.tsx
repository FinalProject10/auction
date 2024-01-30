import React from 'react'

const Prod = () => {
  return (
    <div>
        <div className='w-[90%] h-auto'>
            <div className='flex justify-between'>
                <h1 className='mt-[10px]'>All(0)</h1>
                <div className='text-white font-[800] cursor-pointer mt-[1%] bg-[#ff2800] flex justify-center items-center rounded w-[210px] h-[43px] float-right hover:text-black hover:bg-white hover:border-[2px] hover:border-black hover:transition ease-in-out delay-50 ml-[15%]'>
                {/* the image  */}
                    <img src="" alt="" />
                    <h1>Add New Product +</h1>
                </div>

            </div>
            <hr className='mt-[10px] mb-[10px]'/>
            <div className='flex'>
                <div className='border-[1px] font-[500] w-[85px] h-[43px] flex justify-center items-center'>image</div>
                <div className='border-[1px] font-[500] w-[182px] h-[43px] flex justify-center items-center'>Name</div>
                <div className='border-[1px] font-[500] w-[131px] h-[43px] flex justify-center items-center'>Status</div>
                <div className='border-[1px] font-[500] w-[93px] h-[43px] flex justify-center items-center'>In Stock</div>
                <div className='border-[1px] font-[500] w-[184px] h-[43px] flex justify-center items-center'>Price</div>
                <div className='border-[1px] font-[500] w-[77px] h-[43px] flex justify-center items-center'>Views</div>
                <div className='border-[1px] font-[500] w-[142px] h-[43px] flex justify-center items-center'>Date</div>
            </div>
            <div className='flex bg-[#f2dede] w-auto'>
                <div className='border-[1px] border-gray-50 font-[500] w-[85px] h-[70px] flex justify-center items-center'>image</div>
                <div className='border-[1px] font-[500] w-[182px] h-[70px] flex justify-center items-center'>Name</div>
                <div className='border-[1px] font-[500] w-[131px] h-[70px] flex justify-center items-center'>Status</div>
                <div className='border-[1px] font-[500] w-[93px] h-[70px] flex justify-center items-center'>In Stock</div>
                <div className='border-[1px] font-[500] w-[184px] h-[70px] flex justify-center items-center'>Price</div>
                <div className='border-[1px] font-[500] w-[77px] h-[70px] flex justify-center items-center'>Views</div>
                <div className='border-[1px] font-[500] w-[142px] h-[70px] flex justify-center items-center'>Date</div>
            </div>
        </div>
    </div>
  )
}

export default Prod