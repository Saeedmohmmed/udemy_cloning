'use client'
import AllCoursesList from '@/Components/Lists/AllCoursesList'
import { useGetCourseListPageQuery } from '@/redux/api/Instructor'
import React, { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Paginition from '@/Components/Lists/Paginition'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import Link from 'next/link'


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
    
    
    const {data} = useGetCourseListPageQuery(
        {page:page-1, size:size??10}, 
        {refetchOnMountOrArgChange:true}
    )

    return (
        <div className='lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hiddenw-[80%] p-5'>
            <div className="flex justify-between mb-4">
                <Breadcrumb items={
                    [{href:'/instructor', title:'Dashboard'}, {href:'/instructor/courses',title:'Courses'}]
                } />
                <div className="w-[200px] ">
                    <Link
                        
                        className="block rounded-xl border border-gray-100 p-4 shadow-lg hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                        href={'/instructor/courses/create'}
                    >
                        <h2 className="mt-2 font-bold">Create Course</h2>
                    </Link>
                </div>
            </div>
            <AllCoursesList prefix='/instructor/courses/' courses={data?.courses} />
            <div className='flex justify-center my-10 font-extrabold'>
                <Paginition page={page} totalPages={data?.total} />
            </div>
        </div>
    )
}

export default page