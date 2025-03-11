'use client'
import AllCoursesList from '@/Components/Lists/AllCoursesList'
import { useGetAllCoursesPageQuery } from '@/redux/api/Courses'
import React, { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Paginition from '@/Components/Lists/Paginition'


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

const to_int_or_default = (val:string|null)=>{
    try{
        if(val)
            return parseInt(val)
    }
    catch{
    }
    return null
}

const page = () => {
    const searchParams = useSearchParams()
    let size = to_int_or_default(searchParams.get("size"))
    let page = to_int_or_default(searchParams.get("page"))

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
    
          return params.toString()
        },
        [searchParams]
    )
    const router = useRouter()
    const pathname = usePathname()

    if(!size){
        router.push(pathname + '?' + createQueryString('size', "10"))
    }
    if(!page){
        page = 1
        router.push(pathname + '?' + createQueryString('page', "1"))
    }
    
    
    const {data} = useGetAllCoursesPageQuery(
        {page:page-1, size:size??10}, 
        {refetchOnMountOrArgChange:true}
    )

    return (
        <div className='lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hiddenw-[80%] p-5'>

            <AllCoursesList prefix='/courses/' courses={data?.courses} />
            <div className='flex justify-center my-10 font-extrabold'>
                <Paginition page={page} totalPages={data?.total} />
            </div>
        </div>
    )
}

export default page