'use client'
import React from 'react'
import { useGetSubCategoryByIdQuery } from '@/redux/api/IndustriesApiSlice'

import AllCoursesList from '@/Components/Lists/AllCoursesList'
import { useParams } from 'next/navigation'
import { Header } from '@/app/industries/[id]/_components'
import SubCategories from '@/app/industries/[id]/[category_id]/_categories/SubCategories'


const page = () => {
  const {sub_id}:{sub_id:string} = useParams()
  const {data} = useGetSubCategoryByIdQuery({sub_id})
  
    
  return (
    <div className="lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5 ">
        
      <Header name={data?.subcategory.name} />
      
      <hr className='mb-8' />
      

      <AllCoursesList prefix='/courses/' courses={data?.subcategory.courses} />
    </div>
  )
}

export default page
