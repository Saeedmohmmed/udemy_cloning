'use client'

import SmallCardsList from '@/Components/Lists/SmallCardsList';
import { useGetAllcategoriesQuery } from '@/redux/api/IndustriesApiSlice'
import React from 'react'

interface CategoryType{
  id: string;
  name:string;
  image:string;
  description:string | undefined
}

const page = () => {
  const {data} = useGetAllcategoriesQuery(undefined)
  
  return (
    <div className="lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden px-5 h-screen">

      <h2 
        className='text-3xl font-bold my-7'
      >
        All Categories
      </h2>
      <SmallCardsList items={data?.industries} SkeletonNum={6} preLink='industries' skeletonWidth='470px' />
    </div>
  )
}

export default page
