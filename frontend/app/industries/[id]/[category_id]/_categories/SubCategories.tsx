import React from 'react'
import Smallcard from './Smallcard'
import { ImageSkeleton } from '@/Components/Common';
interface item{
    id: string;
    name: string
}
interface Props{
    items: item[]
}
const SubCategories = ({items}:Props) => {
    const handleImageSkeleton = ({SkeletonNum, height='85px', width='480px'}:{SkeletonNum:number, height?:string, width?:string})=>{
        let total = [];
        for(let i=0; i < SkeletonNum; i ++)
            total.push(<ImageSkeleton key={i} height={height} width={width} rounded='10px' />)

        return total
        }
  return (
    <div className={"grid grid-cols-2 gap-4 sm:grid-cols-3"}>
      {
        items?.length?
            items.map(item=>(
                <Smallcard item={item} key={item.id} />
            ))
        :handleImageSkeleton({SkeletonNum:6})
      }
    </div>
  )
}

export default SubCategories
