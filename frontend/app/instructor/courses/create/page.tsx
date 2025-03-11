'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import CourseForm from './_components/CourseForm'
import { useGetIndustriesQuery, useGetCategoriesMutation, useGetSubCategoriesMutation } from '@/redux/api/homeApi'
import { useCreateCourseMutation } from '@/redux/api/Courses'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/Components/Common/Breadcrumb'

interface courseFormType{
  name: string
  description: string
  category: string
  subcategory: string
  industry: string
  image: File | null
  price: number
}

const page = () => {
  const router = useRouter()
  const [courseForm, setCourseForm] = useState<courseFormType>({
    name:'',
    description: '',
    category: '',
    subcategory: '',
    industry: '',
    image: null,
    price:0
})
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
  const [createCourse, {data, isLoading}] = useCreateCourseMutation()
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
    formData.append('image', courseForm.image ?? "")
    formData.append('price', courseForm.price.toString())
     
    createCourse(formData)
    .unwrap()
    .then(data=>{
      toast.success(data?.message)
      router.push("/instructor/courses/"+data?.id)
    })
    .catch((err:any)=>{     
      setFormErrors(err.data.errors)
    })
  }
  return (

    <div className='w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5'>
      <Breadcrumb items={
        [{href:'/instructor', title:'Dashboard'}, {href:'/instructor/courses',title:'Courses'}, {href:'/instructor/courses/Create',title:'Create'}]
      } />
      <h1 className='text-2xl font-bold my-5'>Create A New Course</h1>
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
        add
      />
    </div>
  )
}

export default page
