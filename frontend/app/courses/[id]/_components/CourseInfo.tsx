import Breadcrumb from '@/Components/Common/Breadcrumb';
import ButtonLink from '@/Components/Common/ButtonLink';
import InfoSkeleton from '@/Components/Common/InfoSkeleton'
import React from 'react'
import StripePayment from './StripePayment';
import { useAppSelector } from '@/redux/hooks';
import BasicRating from '@/Components/Common/BasicRate';
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";

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
      no_of_ratings: number
      avg_rating: number
  }
interface props{
    course:courseType;
    isOwnCourse:boolean;
    isCourseInstructor: boolean
}
interface item{
    href: string;
    title: string;
    icon?: string | undefined
}
const CourseInfo = ({course, isOwnCourse, isCourseInstructor}:props) => {
    const BreadcrumbList = ():item[] | undefined =>{
        if(course)
            return[
                {href:"/industries/"+course.subcategory.category.industry.id, title:course.subcategory.category.industry.name},
                {href:"/categories/"+course.subcategory.category.id, title:course.subcategory.category.name},
                {href:"/subcategories/"+course.subcategory.id, title:course.subcategory.name},
            ]
    }   
	const { isAuthenticated } = useAppSelector(state => state.auth);
    return (
        <div>
            
            {
                course?.name?
                    <div>
                        <h2 className='text-[20px] text-primary font-bold'>{course?.name}</h2>
                        <div className="flex mt-2 text-gray-600 hover:text-gray-500 text-[13px] mb-3">
                            <Breadcrumb items={BreadcrumbList()} />
                        </div>
                        <div className="my-4 flex">
                            <BasicRating rate={course?.avg_rating} />
                            ({course?.no_of_ratings === 0 ? 'be the first to rate this course':course?.no_of_ratings})
                        </div>
                        
                        {
                            course?.price?
                            <div className='mb-7'>
                                {
                                isAuthenticated?
                                    !isOwnCourse?
                                        <>
                                            <p className='text-[17px]'> {course?.price} EGP</p>
                                            <StripePayment course_id={course.id} />
                                        </>
                                    :
                                        <div className="flex gap-3">
                                            {
                                                isCourseInstructor?
                                                    <ButtonLink href={'/instructor/courses/'+course.id}><MdOutlineDashboard />Course Dashboard</ButtonLink>
                                                :null
                                            }
                                            <ButtonLink href={course.id+'/learn'}> <MdOutlineSlowMotionVideo /> Go To Course</ButtonLink>
                                        </div>
                                :null
                                }
                            </div>
                            :null
                        }
                        
        
                        <p>
        
                            {course?.description}
                        </p>
                    </div>
                :
                <InfoSkeleton />
            }
            </div>
      )
}


export default CourseInfo
