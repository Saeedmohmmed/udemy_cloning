'use client'
import React from 'react'
import Sections from './_components/Sections'
import { useGetCourseSectionsAndContentPageQuery } from '@/redux/api/Instructor'
import { useParams } from 'next/navigation'
import AddSection from './_components/AddSection'


const page = () => {
    const {id}:{id:string} = useParams()
    const {data} = useGetCourseSectionsAndContentPageQuery({id}, {refetchOnMountOrArgChange:true, refetchOnReconnect:true})
    return (
        <>
            <div className='p-3'>
                <h1 className='text-xl font-bold my-5'> Sections & Content</h1>
                <Sections sections={data?.sections}  />
            </div>
            <AddSection />
        </>
    )
}

export default page
