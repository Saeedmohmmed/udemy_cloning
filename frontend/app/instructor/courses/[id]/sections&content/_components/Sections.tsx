'use client'
import React, { useState, SyntheticEvent, ChangeEvent} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import Content from './Content';
import { ImageSkeleton } from '@/Components/Common';
import { FaFile, FaPlus, FaTrash } from "react-icons/fa";
import Button from '@/Components/Common/Button';
import AddModal from '@/Components/Modals/AddModal';
import { FloatingInput } from '@/Components/Forms';
import { useAddCourseContentMutation, useDeleteSectionMutation } from '@/redux/api/Instructor';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import DeleteModal from '@/Components/Modals/DeleteModal';


interface contentType{
  id: string;
  name: string;
  file: string;
  video: string
}



interface section{
  id: string;
  name: string;
  content_set: contentType[];

}
interface ContentType{
  name:string
  video:Blob | undefined
  file:Blob | undefined
}

interface Props{
  sections: section[]
}
export default function Sections({sections}:Props) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [openModal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [section_id, setSection_id] = useState<string>()
  const [deletedSection_id, setDeletedSection_id] = useState<string>()
  const [addCourseContent, {isLoading}] = useAddCourseContentMutation()
  const [deleteSection, {isLoading:deleteLoading}] = useDeleteSectionMutation()
  const [content, setContent] = useState<ContentType>({
    name:'',
    video: undefined,
    file: undefined
  })
  const {id}:{id:string} = useParams()
  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
    const { name, value } = event.target;    
    setContent({ ...content, [name]: value });
  };

  const handleSection = (id?:string)=>{
    setSection_id(id)
  }

  const handleModal = ()=>{
    setModal(!openModal)
  }
  const handleDeleteModal = ()=>{
    setDeleteModal(!deleteModal)
  }
  const handleChange =(panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleSkeleton = ()=>{
    const total = []
    for (let index = 0; index < Math.random() * 10; index++) {
      total.push(
        <ImageSkeleton shadow key={index} width='100%' height='50px' rounded='10px' />
      )
    }
    return total
  }
  const handleAdd = ()=>{   
    if (section_id){
      addCourseContent({course_id:id, section_id:section_id?.toString(), name:content.name})
        .unwrap()
        .then(data=>{
          toast.success("content added successfully")
        })
        .catch(err=>{
          console.log(err);
          toast.error("something went wrong contact admin")
        })
      handleModal()
    }
  }
  const handleDeleteSection = () =>{
    if(deletedSection_id){
      deleteSection({section_id:deletedSection_id})
      .unwrap()
      .then(res=>{
        toast.success(res.message)
      })
      .catch(err=>{
        toast.error('something went wrong contact admin')
      })
      setDeleteModal(false)
    }
  }
  return (
    <>
    <DeleteModal
      isLoading={deleteLoading} 
      handleClose={handleDeleteModal} 
      open={deleteModal}     
      deleteAction={handleDeleteSection}        
    >
      you can't retrieve any content you delete ever are you sure you want to delete 
      <span className='font-bold'>"{content.name}" </span>
        session
      ?  
    </DeleteModal>
    <AddModal
      addAction={handleAdd}
      handleClose={handleModal}
      open={openModal}
      isLoading={isLoading}
    >
      <div className="mb-4">
        <p className='my-4 '>Content or Lecture Name will appear in the video and file as a title so make it more descriptive</p>
        <div className="my-4">
          <FloatingInput 
            label='Lecture Name'
            labelId='name'
            onChange={onChange}
            type='text'
            value={content.name}
            required
          />
        </div>
      </div>         
    </AddModal>
    <div className='px-1'>
      {
        sections?
          sections.map(section=>(

            <Accordion key={section.id} expanded={expanded === `${section.id}`} onChange={handleChange(`${section.id}`)}>

              <AccordionSummary
                expandIcon={<MdExpandMore  />}
                aria-controls={`${section.id}bh-content`}
                id={`${section.id}bh-header`}
              > 
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {section.name}
                </Typography>
                <Typography sx={{width: '20%', color: 'text.secondary' }}>({section.content_set.length})</Typography>
                <Typography sx={{ color: 'text.danger' }}>
                  <button
                      onClick={()=>{
                        setDeletedSection_id(section.id)
                        handleDeleteModal()
                      }}
                      className="w-full flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 bg-red-100 hover:bg-red-500 hover:text-white"
                  >
                      <FaTrash /> Delete
                  </button>
                </Typography>

              </AccordionSummary>

              <AccordionDetails>
                {
                  section.content_set?.length?
                    section.content_set.map(content=>(
                      <Content key={content.id} content={content} />
                    ))
                  :
                    <p className='font-semibold ml-3 flex items-center gap-2 text-gray-600'> 
                      <FaFile />
                      No Content added yet
                    </p>
                }
                <div className="flex justify-end mt-3">
                    <Button
                        icon={<FaPlus />}
                        title='Add'
                        isLoading={false}
                        onClick={()=>{
                          handleSection(section.id)
                          handleModal()
                        }}
                    />                      
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        :
          handleSkeleton()
      }
    </div>
    </>
  );
}
