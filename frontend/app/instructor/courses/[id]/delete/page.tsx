'use client'
import React, { useState } from 'react'
import { useGetCourseBaseQuery } from '@/redux/api/Instructor'
import { useParams, useRouter } from 'next/navigation'
import Details from './_components/Details'
import { FaTrash } from 'react-icons/fa'
import Header from './_components/Header'
import CourseDeleteModal from './_components/CourseDeleteModal'
import { useDeleteCourseMutation } from '@/redux/api/Courses'
import { toast } from 'react-toastify'

const page = () => {
  const {id}:{id:string} = useParams()
  const {data} = useGetCourseBaseQuery({id})
  const [modal, setModal] = useState(false)
  const router = useRouter()

  const [deleteCourse] = useDeleteCourseMutation()
  const handleModal = () =>{
    setModal(!modal)
  }
  const formData = ({password}:{password:string}) =>{
    deleteCourse({id, password})
      .unwrap()
      .then(res=>{
        toast.success(`course ${data?.course?.name} deleted successfully`)
        router.push('/')
      }).catch(err=>{
        console.log(err);
        
        toast.error(err?.data.message)
      })
  }
  return (
    <>
        <CourseDeleteModal 
            handleModal={handleModal} 
            open={modal} 
            course={data?.course}
            formData={formData}
        />
        <div className='px-4 py-3'>
            <Header name={data?.course.name} />
            <Details name={data?.course.name} />
            <div className='mt-12'>
                <button
                    onClick={handleModal}
                    className="w-full flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 bg-red-100 hover:bg-red-500 hover:text-white"
                >
                    <FaTrash /> Delete
                </button>
            </div>
        </div>
    </>
  )
}

export default page
