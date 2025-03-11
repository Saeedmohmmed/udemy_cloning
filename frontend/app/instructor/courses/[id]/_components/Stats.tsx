import BasicCard from '@/Components/Cards/BasicCard'
import BaseChart from '@/Components/charts/BaseChart'
import React from 'react'

interface purchasing_histroyType{
    years: []
    numbers: []
    total: number
    price: number
    total_earned: number
}
interface Props{
    purchasing_histroy: purchasing_histroyType
}

const Stats = ({purchasing_histroy}:Props) => {
  return (
    <div className="grid grid-cols-3 px-4 my-4">
        <div className="col-span-2 px-3">
          <BaseChart x_label='years' x={purchasing_histroy?.years} y={purchasing_histroy?.numbers} />
        </div>
        <div className="col-span-1">
          <div className="rounded-md bg-gray-100 gap-2 grid grid-rows-2 p-3 mt-8 h-[90%]">           
             <BasicCard textcolor='text-blue-600' title='Total Enrolled' value={purchasing_histroy?.total.toString()} />
             <BasicCard textcolor='text-green-600' title='Total Profit' value={purchasing_histroy?.total_earned.toString()} />
          </div>
        </div>
    </div>
  )
}

export default Stats
