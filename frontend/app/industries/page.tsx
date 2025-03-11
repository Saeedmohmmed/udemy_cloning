'use client'
import SmallCard from '@/Components/Cards/SmallCard'
import { ImageSkeleton } from '@/Components/Common';
import SmallCardsList from '@/Components/Lists/SmallCardsList';
import { useGetAllIndustriesQuery } from '@/redux/api/IndustriesApiSlice'
import React from 'react'

interface IndustryType{
  id: string;
  name:string;
  image:string;
  description:string | undefined
}

const page = () => {
  const {data} = useGetAllIndustriesQuery(undefined)
  
  return (
    <div className="lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden px-5 h-screen">

      <h2 
        className='text-3xl font-bold my-7'
      >
        All Industries
      </h2>
      <SmallCardsList items={data?.industries} SkeletonNum={6} preLink='industries' skeletonWidth='470px' />
    </div>
  )
}

export default page
