'use client'
import React,{useEffect, useState, useMemo, useCallback} from 'react'
import axios from 'axios'
import Link from 'next/link'
import LoadingLink from '../components/LoadingLink'
import Image from 'next/image'
import { FaHammer } from 'react-icons/fa'
import { API_URL } from '../../utils/api'

const Auctions = () => {
    const[color,setColor]=useState([true,false]) // Default to Newly Listed
    const[data,setData]=useState([])
    const[allData,setAllData]=useState([])
    const[allData1,setAllData1]=useState([])
    const[loading,setLoading]=useState(true)
    
    useEffect(()=>{
        let isMounted = true;
        const abortController = new AbortController();
        
        axios.get(`${API_URL}/items/get`, { signal: abortController.signal })
            .then(r=>{
                if (!isMounted) return;
                
                const items = r.data || [];
                setAllData(items);
                setAllData1(items);
                // Default: Show newly listed (last 8 items)
                const newlyListed = [...items].sort((a, b) => 
                    new Date(b.createdAt || b.timeStart).getTime() - new Date(a.createdAt || a.timeStart).getTime()
                ).slice(0, 8);
                setData(newlyListed);
                setLoading(false);
            })
            .catch(err=>{
                if (axios.isCancel(err)) return;
                if (isMounted) {
                    console.error(err);
                    setLoading(false);
                }
            });
        
        return () => {
            isMounted = false;
            abortController.abort();
        };
    },[])
    
    const endingSoon=()=>{
        const now = new Date().getTime();
        const filtered = allData1.filter(el=>{
            const timeEnd = new Date(el.timeEnd).getTime();
            const hoursLeft = (timeEnd - now) / (1000 * 60 * 60);
            return hoursLeft > 0 && hoursLeft <= 48;
        }).sort((a, b) => new Date(a.timeEnd).getTime() - new Date(b.timeEnd).getTime());
        setData(filtered.slice(0, 8));
    }
    
    const newlyListed=()=>{
        const sorted = [...allData1].sort((a, b) => 
            new Date(b.createdAt || b.timeStart).getTime() - new Date(a.createdAt || a.timeStart).getTime()
        );
        setData(sorted.slice(0, 8));
    }
  return (
    <div className='w-full max-w-[1400px] mx-auto px-6 py-16'>
        <div className='flex items-center justify-between mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight'>Auctions</h1>
          <div className='flex gap-6 font-semibold text-gray-600'> 
            <button 
              className={`transition-all duration-200 pb-2 border-b-2 ${
                color[0] 
                  ? 'text-gray-900 border-red-500' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              onClick={()=>{
                setColor([true,false]);
                newlyListed();    
              }}
            >
              Newly Listed
            </button>
            <button 
              className={`transition-all duration-200 pb-2 border-b-2 ${
                color[1] 
                  ? 'text-gray-900 border-red-500' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              onClick={()=>{
                setColor([false,true]);
                endingSoon();
              }}
            >
              Ending Soon
            </button>
          </div>
        </div>
    {loading ? (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Loading auctions...</p>
      </div>
    ) : data.length === 0 ? (
      <div className="text-center py-20 text-gray-500">No auctions found.</div>
    ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {data.map((el,i)=>(
        <LoadingLink href={`/item/${el.id}`} key={el.id}>
        <div className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer'>
            <div className='relative overflow-hidden h-[220px]'>
              <Image
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                src={Array.isArray(el.images) ? el.images[0] : (el.images || 'https://via.placeholder.com/400x300')} 
                alt={el.name}
                fill
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              <div className='absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1'>
                <FaHammer size={12} />
                {(() => {
                  const now = new Date().getTime();
                  const timeEnd = new Date(el.timeEnd).getTime();
                  const hoursLeft = Math.floor((timeEnd - now) / (1000 * 60 * 60));
                  return hoursLeft > 0 ? `${hoursLeft}h` : 'Ended';
                })()}
              </div>
            </div>
            <div className='p-5'>
              <h1 className='group-hover:text-[#ff2800] text-xl font-bold text-gray-900 mb-2 transition-colors duration-200 line-clamp-1'>
                {el.name}
              </h1>
              <p className='mb-3 font-medium text-gray-600 text-sm line-clamp-2'>{el.short_description}</p>
              <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Current Bid</span>
                <span className='text-lg font-bold text-red-500'>{el.price ? `$${el.price.toLocaleString()}` : 'N/A'}</span>
              </div>
            </div>
        </div>
        </LoadingLink>
        ))}
      </div>
    )}
    </div>
  )
}

export default Auctions