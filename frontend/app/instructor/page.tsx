'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Stats from './courses/[id]/_components/Stats'
import { useGetIndexPageQuery } from '@/redux/api/Instructor'
import BaseAlert from '@/Components/alerts/BaseAlert'

const page = () => {
  const {data, isLoading} = useGetIndexPageQuery(undefined)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(!loading)
    }
    ,1000)   
  },[isLoading])
 
  return (
    <div className='lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden min-h-screen'>
      <div className="flex justify-between">
        <div className="w-[200px] p-3">
            <Link
                
                className="block rounded-xl border border-gray-100 p-4 shadow-lg hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href={'instructor/courses'}
            >
                <h2 className="mt-2 font-bold">See All Courses</h2>
            </Link>
        </div>
        <div className="w-[200px] p-3">
            <Link
                
                className="block rounded-xl border border-gray-100 p-4 shadow-lg hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href={'instructor/courses/create'}
            >
                <h2 className="mt-2 font-bold">Create Course</h2>
            </Link>
        </div>
      </div>

      {
        data?.purchasing_histroy || loading?
          <Stats purchasing_histroy={data?.purchasing_histroy} />
        :
        <BaseAlert
          success
          title='No Content'
          message={data?.message}
        />
      }

    </div>
  )
}

export default page
