'use client'
import Button from '@/Components/Common/Button'
import { FloatingInput } from '@/Components/Forms'
import AddModal from '@/Components/Modals/AddModal'
import React, { ChangeEvent, useState } from 'react'
import { useAddNewSectionMutation } from '@/redux/api/Instructor'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'

const AddSection = () => {
    const {id}:{id:string} = useParams()
    const [modal, setModal] = useState(false)
    const [newsection, setnewsection] = useState('')
    const [addNewSection, {isLoading}] = useAddNewSectionMutation()
    const handleModal = ()=>{
        setModal(!modal)
    }
    const AddAction = ()=>{
        addNewSection({course_id:id, section_name:newsection})
        .unwrap()
        .then(res=>{            
            toast.success(`section ${newsection} added successfully!`)
        }).catch(err=>{
            console.log("err", err);
            toast.error('something went wrong please try again')
        })
        setModal(false)
    }
    const handleNewSection = (e:ChangeEvent<HTMLInputElement>) =>{
        setnewsection(e.target.value)
    }
  return (
    <div>
        <AddModal
            open={modal}
            handleClose={handleModal}
            addAction={AddAction}
            isLoading={isLoading}
        >
            <div className='mb-3 w-[500px]'>
                <h1 className='py-5 font-bold '>
                    Add New Section
                </h1>
                <FloatingInput 
                    label='section name'
                    labelId='new-section'
                    onChange={handleNewSection}
                    type='text'
                    value={newsection}
                    required
                />
            </div>
        </AddModal>
        <div className="flex justify-end p-4">
            <Button
                isLoading={isLoading}
                title='Add Section'        
                onClick={handleModal}
            />
        </div>
    </div>
  )
}

export default AddSection
