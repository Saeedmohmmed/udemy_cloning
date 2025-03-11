'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useGetIndustriesQuery, useGetCategoriesMutation, useGetSubCategoriesMutation } from '@/redux/api/homeApi'
import { useCreateCourseMutation, useEditCourseMutation } from '@/redux/api/Courses'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation';
import { useGetCourseBaseQuery } from '@/redux/api/Instructor'
import CourseForm from '../../create/_components/CourseForm'

interface courseFormType{
  name: string
  description: string
  category: string
  subcategory: string
  industry: string
  // image: File | null
  price: number
}

const page = () => {
  const {id}:{id:string} = useParams()
  const {data:oldCourse, isLoading:oldCourseLoading} = useGetCourseBaseQuery({id})
  
  const [courseForm, setCourseForm] = useState<courseFormType>({
    name:'',
    description: '',
    category: '',
    subcategory: '',
    industry: '',
    // image: null,
    price:0
})
useEffect(()=>{
  if (oldCourse){
    setCourseForm({
      name: oldCourse?.course?.name,
      description: oldCourse?.course?.description,
      category: oldCourse?.course?.subcategory.category?.id,
      subcategory: oldCourse?.course?.subcategory?.id,
      industry: oldCourse?.course?.subcategory.category?.industry.id,
      // image: oldCourse?.course?.image,
      price:oldCourse?.course?.price
    })
    
  }
},[oldCourseLoading])
const [formErrors, setFormErrors] = useState(null)
const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
const { name, value } = event.target;
    
setCourseForm({ ...courseForm, [name]: value });
};
const selectChange = (e: ChangeEvent<HTMLSelectElement> )=>{
    const { name, value } = e.target;        
setCourseForm({ ...courseForm, [name]: value });
}

const imageChange = (e: ChangeEvent<HTMLInputElement> )=>{
    const { name, files } = e.target;        
    setCourseForm({ ...courseForm, [name]: files?.length? files[0] : '' });
}
  const {data: industries} = useGetIndustriesQuery(undefined)
  const [getCategory, {data: categories}] = useGetCategoriesMutation()
  const [getSubCategory, {data: subcategories}] = useGetSubCategoriesMutation()
  const [editCourse, {isLoading}] = useEditCourseMutation()
  useEffect(()=>{   
    if(courseForm.industry)
      getCategory({id:courseForm.industry})
  },[courseForm.industry])

  useEffect(()=>{    
    if(courseForm.category)
      getSubCategory({id:courseForm.category})
  },[courseForm.category])

  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()    
    const formData = new FormData()
    formData.append('name', courseForm.name)
    formData.append('description', courseForm.description)
    formData.append('category', courseForm.category)
    formData.append('industry', courseForm.industry)
    formData.append('subcategory', courseForm.subcategory)
    // formData.append('image', courseForm.image ?? "")
    formData.append('price', courseForm.price.toString())
     
    editCourse({id,form:formData})
    .unwrap()
    .then(data=>{
      toast.success(data?.message)
      // router.push("/courses/"+data?.id+"/manage")
    })
    .catch((err:any)=>{     
      setFormErrors(err.data.errors)
    })
  }
  return (
    <div className='w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5'>
      <h1 className='text-2xl font-bold my-5'>{courseForm.name}</h1>
      <CourseForm
        industries={industries?.industries}
        categories={categories?.categories}
        subcategories={subcategories?.subcategories} 
        onChange={onChange}
        selectChange={selectChange}
        imageChange={imageChange}
        courseForm={courseForm}
        formSubmit={formSubmit}
        isLoading={isLoading}
        errors={formErrors}
        type='Save'
      />
    </div>
  )
}

export default page
