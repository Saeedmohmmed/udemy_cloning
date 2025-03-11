import { ImageSkeleton } from '@/Components/Common'
import React from 'react'

const Header = ({name}:{name:string}) => {
  return (
    <div className='my-4'>
        {
            name?
                <h1 className='text-xl font-bold'>
                    {name}
                </h1>
            :
            <ImageSkeleton width='600px' height='30px' />
        }
    </div>
  )
}

export default Header
