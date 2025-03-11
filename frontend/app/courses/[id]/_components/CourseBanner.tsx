import { ImageSkeleton } from '@/Components/Common';
import Image from 'next/image';
import React from 'react'

interface props{
    image:string;
}
const CourseBanner = ({image}:props) => {
    
    return (
        <div className='w-[100%] h-auto overflow-hidden'>
            {
            image?
                <img
                    className='w-[90%] mx-auto rounded-lg'
                    alt='banner image'
                    src={process.env.NEXT_PUBLIC_HOST+image}
                />
            :
                <ImageSkeleton width={'90%'} height={'300px'} rounded='10px' />
            }
        </div>
      )
}

export default CourseBanner
