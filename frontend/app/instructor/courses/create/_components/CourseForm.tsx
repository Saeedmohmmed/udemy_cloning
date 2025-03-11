import React, { ChangeEvent, FormEvent } from 'react'
import {
    FloatingInput, 
    FloatingSelectInput, 
    FloatingTextarea,
    ImageInput
} from '@/Components/Forms';
import Button from '@/Components/Common/Button';

interface baseType{
    id: string;
    name: string
}
interface courseFormType{
    name: string
    description: string
    category: string
    subcategory: string
    industry: string
    image?: File | null
    price: number
  }
  
interface Props{
    industries: baseType[]
    categories:baseType[]
    subcategories: baseType[]
    onChange:(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> )=>void;
    selectChange:(e: ChangeEvent<HTMLSelectElement> )=> void;
    imageChange?: (e: ChangeEvent<HTMLInputElement> )=> void;
    courseForm:courseFormType,
    formSubmit:(e:FormEvent<HTMLFormElement>) =>void
    isLoading:boolean
    errors?:any | null
    type?: string
    add?:boolean
}

const CourseForm = (
    {industries,
    categories,
    subcategories,
    onChange,
    selectChange,
    imageChange,
    courseForm,
    formSubmit,
    isLoading,
    errors,
    type,
    add
    }:Props
) => {    
  return (
    <div className='w-full'>
      <form
        encType='multipart/form-data'
        onSubmit={(e)=>formSubmit(e)}
        method='post'
      >
        <div className="mb-4">
            <FloatingInput
                labelId={'name'}
                type={'text'}
                onChange={onChange}
                value={courseForm.name}
                label={'Course Name'}
                required= {true}
                errors={errors?.name}
            />
        </div>

       

        <div className="mb-4">
            <FloatingSelectInput
                label='industry'
                labelId='industry'
                value={courseForm.industry}
                required={true}
                onChange={selectChange}
                emptyoption={true}
                errors={errors?.industry}
            >
                {
                    industries?.length?
                        industries.map(industry=>(
                            <option key={industry.id} value={industry.id}>{industry.name}</option>   
                        ))
                    :
                    null
                }
            </FloatingSelectInput>
        </div>
        
        <div className="mb-4">
            <FloatingSelectInput
                label='category'
                labelId='category'
                value={courseForm.category}
                required={true}
                onChange={selectChange}
                emptyoption={true}
                errors={errors?.category}

            >
                {
                    categories?.length?
                        categories.map(category=>(
                            <option key={category.id} value={category.id}>{category.name}</option>   
                        ))
                    :
                    null
                }  
            </FloatingSelectInput>
        </div>


        <div className="mb-4">
            <FloatingSelectInput
                label='subcategory'
                labelId='subcategory'
                value={courseForm.subcategory}
                required={true}
                onChange={selectChange}
                emptyoption={true}
                errors={errors?.subcategory}
            >
                {
                    subcategories?.length?
                        subcategories.map(subcategory=>(
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>   
                        ))
                    :
                    null
                }    
            </FloatingSelectInput>
        </div>

        <div className="mb-4">
            <FloatingTextarea
                labelId={'description'}
                onChange={onChange}
                value={courseForm.description}
                label={'Course Description'}
                errors={errors?.subcategory}
            >
            </FloatingTextarea>
        </div>
        
        

        

        <div className="mb-4">
            <FloatingInput
                labelId={'price'}
                type={'number'}
                onChange={onChange}
                value={courseForm.price}
                label={'Price'}
                required= {false}
                errors={errors?.subcategory}
            >
                <div className="absolute right-4 top-2 text-primary">
                    EGP
                </div>
            </FloatingInput>
        </div>
        {
            add?
                <div className="mb-4">
                    <ImageInput
                        labelId={'image'}
                        type={'file'}
                        onChange={imageChange}
                        file={courseForm.image}
                        label={'Course Image'}
                        required= {false}
                        errors={errors?.subcategory}
                    />
                </div>
        :null
        }
        <div className="flex justify-end">
            <Button title={type?type:'Create'} isLoading={isLoading} submit />
        </div>

      </form>
      
    </div>
  )
}

export default CourseForm
