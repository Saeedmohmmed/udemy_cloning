'use client'
import { FloatingInput, ImageInput } from '@/Components/Forms';
import AddModal from '@/Components/Modals/AddModal';
import DeleteModal from '@/Components/Modals/DeleteModal';
import { useDeleteCourseContentMutation, useEditCourseContentMutation } from '@/redux/api/Instructor';
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify';


interface contentType{
  id: string;
  name: string;
  file: string
  video:string
}
interface newContentType{
  id:string
  name:string
  file:File | null;
  video:File | null;
}
interface Props{
  content:contentType
}

const Content = ({content}:Props) => {
  const [editCourseContent ,{isLoading:editLoading}] = useEditCourseContentMutation()
  const [openModal, setModal] = useState(false)
  const [openEditModal, setEditModal] = useState(false)
  const [deleteCourseContent, {isLoading, data, isError}] = useDeleteCourseContentMutation()
  const [tempContent, setContent] = useState<newContentType>({
    id: content.id,
    name: content.name,
    file: null,
    video: null
  })
  const [tempErrors, setTempErrors] = useState<{
    file: string[];
    video: string[]
  }>({
    file: [],
    video: []
  })
  const handleClose=()=>{
    setModal(!openModal)
  }
  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
    const { name, value } = event.target;
    setContent({ ...tempContent, [name]: value });
  };
  const videoChange = (e: ChangeEvent<HTMLInputElement> )=>{
    const { files } = e.target;
    if (files?.length){
      const file = files[0]
      
      if (file && file.type.includes('video')){
        setContent({ ...tempContent, video: file });
        setTempErrors({...tempErrors, video: []})
      }else{
        setTempErrors({...tempErrors, video: ['Invalid file type']})
      }
    }        
  }
  const fileChange = (e: ChangeEvent<HTMLInputElement> )=>{
    const { files } = e.target;        
    setContent({ ...tempContent, file: files?.length? files[0] : null });
  }
  const deleteAction = ()=>{
    deleteCourseContent({content_id: content.id})
    setModal(!openModal)
    if(!isError)
    {
      toast.success(`${content.name} deleted successfully`)
    }
    else{
      toast.error(`somethinf went wrong while deleting ${content.name}`)
    }
  }
  const handleEdit = ()=>{
    const form = new FormData()
    form.append('name', tempContent.name)
    if(tempContent.video)
      form.append('video', tempContent.video)
    if(tempContent.file)
      form.append('file', tempContent.file)
    editCourseContent({content_id: content.id, form:form})
    .unwrap()
    .then(data=>{

      setEditModal(!openEditModal)
      toast.success(`${content.name} updated successfully`)      
    }).catch(err=>{
      console.log(err);
      setEditModal(!openEditModal)
      toast.error(`something went wrong`) 
    })
  }
  const handleEditModal = ()=>{
    setEditModal(!openEditModal)
  }
  
  return (
    <>
    <AddModal
        addAction={handleEdit}
        handleClose={handleEditModal}
        open={openEditModal}
        isLoading={editLoading}
      >
        <div className="my-6 w-[40rem]">
            <h4 className='mb-10 font-bold truncate'>{content.name}</h4>
            <FloatingInput 
              label='Lecture Name'
              labelId='name'
              onChange={onChange}
              type='text'
              value={tempContent.name}
              required
            />
            <ImageInput
              label='Video'
              labelId='video'
              onChange={videoChange}
              type='file'
              file={tempContent.video}
              errors={tempErrors.video}
            />

            <ImageInput
              label='File'
              labelId='file'
              onChange={fileChange}
              type='file'
              file={tempContent.file}
            />
        </div>         
      </AddModal>
      {
        content?
          <DeleteModal
            isLoading={isLoading} 
            handleClose={handleClose} 
            open={openModal}     
            deleteAction={deleteAction}        
          >
            you can't retrieve any content you delete ever are you sure you want to delete 
            <span className='font-bold'>"{content.name}" </span>
             session
            ?  
          </DeleteModal>
        : null
      }
      <div className="flex">
            <label
              htmlFor={content.id}
              className="w-full flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center">
                &#8203;
                <input type="checkbox" className="size-4 rounded border-gray-300" id={content.id} />
              </div>

              <div className='w-full'>
                <strong className="font-medium text-gray-900"> {content.name} </strong>
                {
                  !content.video && !content.file?
                    <div className="">No Data Added</div>
                  :null
                }
                {
                  content.video?
                    <Link href={process.env.NEXT_PUBLIC_HOST+content.video} className="block hover:underline mt-1 text-pretty text-sm text-gray-700">
                      Video
                    </Link>
                  :null
                }
                {
                  content.file?
                    <Link href={process.env.NEXT_PUBLIC_HOST+content.file} className="block hover:underline mt-1 text-pretty text-sm text-gray-700">
                      File
                    </Link>
                  :null
                }
                <div className="flex w-full justify-end">
                  <button
                      onClick={handleEditModal}
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-100"
                  >
                      <FaEdit />
                      Edit
                  </button>
                  <button
                      onClick={handleClose}
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
                  >
                      <FaTrash />
                      Delete
                  </button>
                </div>
              </div>
            </label>
      </div>
    </>
  )
}

export default Content
