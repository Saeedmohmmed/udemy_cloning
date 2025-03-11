'use client'
import React from 'react'
import { useGetCourseStaticsPageQuery } from '@/redux/api/Instructor'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Header from './_components/header'
import CourseBanner from '../_components/CourseBanner'
import Stats from './_components/Stats'
const page = () => {
  const {id}:{id:string} = useParams()
  const {data, isError, error} = useGetCourseStaticsPageQuery({id})
  const router = useRouter()
  const resError:any = error;

  if(isError && (resError?.status === 401 || resError?.status === 403) ){
    toast.error('Please Login with the instructor account First')
    router.push(`/courses/${id}`)
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center mb-5 px-4 pt-5">
        <div className="col-span-2">
          <Header course={data?.course} />
        </div>
        <CourseBanner image={data?.course?.image} />
      </div>
      <Stats purchasing_histroy={data?.purchasing_histroy} />
    </div>
  )
}

export default page
