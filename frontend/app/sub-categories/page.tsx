'use client'

import SmallCardsList from '@/Components/Lists/SmallCardsList';
import { useGetSubCategoriesQuery } from '@/redux/api/IndustriesApiSlice'
import React from 'react'
import SubCategories from '../industries/[id]/[category_id]/_categories/SubCategories';

interface CategoryType{
  id: string;
  name:string;
  image:string;
  description:string | undefined
}

const page = () => {
  const {data} = useGetSubCategoriesQuery(undefined)
  
  return (
    <div className="lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden px-5 h-screen">

      <h2 
        className='text-3xl font-bold my-7'
      >
        All Sub-Categories
      </h2>
      <SubCategories items={data?.subcategories} />
    </div>
  )
}

export default page
