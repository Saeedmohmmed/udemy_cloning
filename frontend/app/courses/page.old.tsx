'use client'
import AllCoursesList from '@/Components/Lists/AllCoursesList'
import { useGetAllCoursesPageQuery } from '@/redux/api/Courses'
import React, { useEffect, useState } from 'react'


interface categoryType{
  id: string;
  name: string;
}

interface userType{
  id: string;
  first_name: string;
  last_name: string;
}
interface courseType{
    id: string,
    name: string,
    image: string,
    price: number,
    description: string,
    created_at: Date,
    instructor: userType;
    category: categoryType;
}

const page = () => {
    const [page, setPage] = useState<number>(0)
    const {data, isLoading, isSuccess} = useGetAllCoursesPageQuery({page:page, size:2})
    const [coursesData, setCourseData] = useState([])
    // let coursesData : any= []
    const handleScroll = () =>{
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement
      
      if(scrollTop + clientHeight >= scrollHeight - 100)
      {       
        setTimeout(()=>{
          setPage(page+1)
        },3000)
      }
    }

    useEffect(()=>{
      window.addEventListener('scroll', handleScroll)      
      return ()=>{
        window.removeEventListener('scroll', handleScroll)
      }
    }, [isLoading, page])

    useEffect(()=>{
      
      setCourseData((prev)=>{
        prev.push.apply(prev, data?.courses)
        return prev
      })
    },[page])
    
  return (
    <div className='p-5'>
      {
          <AllCoursesList courses={coursesData} />
      }
    </div>
  )
}

export default page