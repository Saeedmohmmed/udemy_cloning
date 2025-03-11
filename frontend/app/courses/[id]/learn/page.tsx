'use client'
import CustomedSpinner from '@/Components/Common/CustomedSpinner'
import VideoPlayer from '@/Components/Common/VideoPlayer'
import CourseContentList from '@/Components/Lists/CourseContentList'
import { useGetCourseContentQuery, useGetSectionContentMutation } from '@/redux/api/Courses'
import { useParams, usePathname, useSearchParams, useRouter, notFound } from 'next/navigation'
import { useEffect } from 'react'

interface contentType{
  id: string;
  name: string;
  file: string;
  video: string
}

interface sectionType{
  id: string;
  content_set: contentType[]
}

const page = () => {
    const {id}:{id:string} = useParams()
    const searchParams = useSearchParams()
    const {data} = useGetCourseContentQuery({id})
    const [getSectionContent, {isLoading, data:conents}] = useGetSectionContentMutation()
    const router = useRouter()
    const pathname = usePathname()

    let lecture_id = searchParams.get('lecture')
    let section_id = searchParams.get('section')
    
    if(!lecture_id || !section_id){      
      setTimeout(()=>{
        if(data?.sections[0].content_set[0].id)
          router.push(pathname + `?section=${data?.sections[0].id}&lecture=${data?.sections[0].content_set[0].id}`)
        else
          notFound();
      },1000)      
    }
    const section = data?.sections.filter((section:sectionType)=>(
      section.id === section_id
    ))[0]
    const lecture = ()=>{
      return section?.content_set?.filter((content:contentType)=>content.id === lecture_id)[0]
    }
    
    useEffect(()=>{
      if(lecture_id)
        getSectionContent({id, content_id:lecture_id})
    },[lecture_id])

    
    
  return (
    <div>
      <div className="grid grid-cols-10  h-[calc(100vh-64px)]">
        <div className="md:col-span-8 col-span-10"> 
        {
          conents?.content?
            <VideoPlayer lecture={conents.content} />
          :
            <CustomedSpinner />
        }
        </div>
        {
          section?.id ?
            <div className="md:col-span-2 block mx-3 col-span-10">
                <CourseContentList section_id={section?.id} sections={data?.sections} />
            </div>
          :null
        }
      </div>
    </div>
  )
}

export default page
