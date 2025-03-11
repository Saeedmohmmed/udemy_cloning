import React from 'react'
import { DefaultSwiper } from '@/Components/Swipper'
import { ImageSkeleton } from '@/Components/Common'

interface image{
  id: string
  image: string
  title: string | undefined
  description: string | undefined
}
interface props{
  isLoading: boolean,
  images: image[]
}

const Hero = ({isLoading, images}: props) => { 
  return (
    <div className="relative bg-hero-gradiant ">
      {
        images?.length?
          <DefaultSwiper isLoading={isLoading} images={images} />
        :
        <ImageSkeleton width='100%' height="440px" />
      }
    </div>
  )
}

export default Hero
