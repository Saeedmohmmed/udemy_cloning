import { ImageSkeleton } from '@/Components/Common'
import React from 'react'

const Details = ({name}:{name:string}) => {
  return (
    <div className='my-4'>
        {
            name?
            <p className='text-red-600 px-5'>
                The deletion of <span className='font-semibold'> '{name}' </span> will result in an automatic refund of all profits to the purchaser, and this action will deduct the corresponding amount from your wallet.
            </p>
            :
            <>
                <ImageSkeleton width='100%' height='20px' margin='5px 0px' />
                <ImageSkeleton width='65%' height='20px' margin='5px 0px' />
            </>
        }
    </div>
  )
}

export default Details
