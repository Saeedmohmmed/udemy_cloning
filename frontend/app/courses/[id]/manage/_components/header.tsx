import { ImageSkeleton } from '@/Components/Common'
import BasicRating from '@/Components/Common/BasicRate'
import Breadcrumb from '@/Components/Common/Breadcrumb';
import Link from 'next/link';
import React from 'react'
import { FaEdit } from 'react-icons/fa';

interface props{
    course:courseType
}
interface IndustryType{
    id: string;
    name: string;
  }
  interface categoryType{
    id: string;
    name: string;
    industry:IndustryType
  }
interface subcategoryType{
    id: string;
    name: string;
    category:categoryType
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
      subcategory: subcategoryType;
      no_of_ratings: number;
      avg_rating: number;
      
  }
  interface item{
    href: string;
    title: string;
    icon?: string | undefined
}
const Header = ({course}:props) => {
    const BreadcrumbList = ():item[] | undefined =>{
        if(course)
            return[
                {href:"/industries/"+course.subcategory.category.industry.id, title:course.subcategory.category.industry.name},
                {href:"/categories/"+course.subcategory.category.id, title:course.subcategory.category.name},
                {href:"/subcategories/"+course.subcategory.id, title:course.subcategory.name},
            ]
    }   
    const handleSkeleton = ()=>{
        const total = []
        total.push(
            <div className="my-2" key={1}>
                <ImageSkeleton width='90%' height='40px' /> 
            </div>
        )

        total.push(
            <div className="" key={2}>
                <ImageSkeleton width='350px' height='40px' /> 
            </div>
        )
        return total
    }
  return (
    <div className='px-3'>
    {
        course?
        <>
            <h1 className='text-2xl font-bold my-4 flex items-center gap-2'>
                {course?.name}
                <Link title='edit course' href={"manage/settings"} className='text-primary p-3 rounded-full hover:bg-gray-200'>
                    <FaEdit />
                </Link>
            </h1>
            <div className="m-3">
                <Breadcrumb items={BreadcrumbList()} />
            </div>
            <div className="my-4 mx-3 flex">
                <BasicRating rate={course?.avg_rating} />
                <span className="ml-3">
                    ({course?.no_of_ratings === 0 ? 'No one rate this course':course?.no_of_ratings})
                </span>
            </div>
            <p className="text-md my-10">
                {course.description}
            </p>
        </>
        :
        handleSkeleton()
    }
    </div>
  )
}

export default Header
