'use client'
import React from 'react'
import { useGetCategoryByIdQuery } from '@/redux/api/IndustriesApiSlice'

import AllCoursesList from '@/Components/Lists/AllCoursesList'
import { useParams } from 'next/navigation'
import { Header } from '@/app/industries/[id]/_components'
import SubCategories from '@/app/industries/[id]/[category_id]/_categories/SubCategories'


const page = () => {
  const {id, category_id}:{id:string, category_id:string} = useParams()
  const {data} = useGetCategoryByIdQuery({category_id})
  
    
  return (
    <div className="lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5 ">
        
      <Header image={data?.category.image} name={data?.category.name} />
      
      <hr className='mb-8' />
      
      <h2 className='text-xl font-bold mb-5  mt-20`'>All Sub Categories</h2>
      <SubCategories items={data?.category.SubCategories}  />

      
      <hr className='mt-8'/>
      <h2 className='text-xl font-bold mt-20'>Top Courses</h2>

      <AllCoursesList prefix='/courses/' courses={data?.category.courses} />
    </div>
  )
}

export default page
