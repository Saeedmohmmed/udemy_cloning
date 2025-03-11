'use client'
import React from 'react'
import { useGetIndustryByIdQuery } from '@/redux/api/IndustriesApiSlice'
import {Header} from './_components'
import SmallCardsList from '@/Components/Lists/SmallCardsList'
import AllCoursesList from '@/Components/Lists/AllCoursesList'
type Props = {
    params: { id: string }
  }


const page = ({params}:Props) => {
  const {id} = params
  const {data} = useGetIndustryByIdQuery({id})
  
    
  return (
    <div className="lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5 ">
        
      <Header image={data?.industry.image} name={data?.industry.name} />
      
      <hr className='mb-8' />
      
      <h2 className='text-xl font-bold mb-5  mt-20`'>All Categories</h2>
      <SmallCardsList skeletonWidth='470px' SkeletonNum={9} items={data?.industry.Categories}  preLink={`industries/${id}`} />

      
      <hr className='mt-8'/>
      <h2 className='text-xl font-bold mt-20'>Top Courses</h2>

      <AllCoursesList prefix='/courses/' courses={data?.industry.courses} />
    </div>
  )
}

export default page
