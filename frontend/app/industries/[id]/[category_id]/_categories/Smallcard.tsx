import { ImageSkeleton } from '@/Components/Common';
import Link from 'next/link';
import React from 'react'
interface item{
    id: string;
    name: string
}
interface props{
    item:item
}
const Smallcard = ({item}:props) => {
    
  return (
    <Link
        key={item.id}
        className="block rounded-xl border border-gray-100 p-4 shadow-lg hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
        href={`/sub-categories/`+item.id}
    >
        <span className="inline-block rounded-lg bg-gray-50 p-1">
            {/* <Image
                height={40}
                width={40}
                src={process.env.NEXT_PUBLIC_HOST + item.image} 
                alt={item.name} 
                unoptimized
            /> */}
        </span>

        <h2 className="mt-2 font-bold">{item.name}</h2>

        {/* <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
            {item.description}
        </p> */}
    </Link>
  )
}

export default Smallcard
