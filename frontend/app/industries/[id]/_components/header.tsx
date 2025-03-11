import { ImageSkeleton } from '@/Components/Common';
import React from 'react'

interface props{
    name: string;
    image?: string;
}
const header = ({name, image}: props) => {
  return (
    <div className='flex items-center '>
        {
            image || name?
            <>
                {
                    image?
                        <img 
                            src={process.env.NEXT_PUBLIC_HOST+image} 
                            className="w-[100px]" 
                        />
                    :null
                }
                <h1 className='text-3xl font-bold '>{name}</h1>
            </>
            : 
            <div className='flex gap-4 items-center p-4'>
                <ImageSkeleton width='80px' height='80px' rounded='100%' />
                <ImageSkeleton width='300px' height='40px' />
            </div>
        }
    </div>
  )
}

export default header
