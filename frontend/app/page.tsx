'use client'
import CategoriesSection from './_Components/CategoriesSection';
import Hero from './_Components/Hero';
import { useGetIndexPageQuery } from '@/redux/api/homeApi';
import CardsSwiperWithTitle from '@/Components/Swipper/CardsSwiperWithTitle';



export default function Home() {
  const {data, isLoading} = useGetIndexPageQuery(undefined)
 
  return (
    <div className="lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden">
      <div>
        <Hero images={data?.images} isLoading={isLoading} />
      </div>

      <CategoriesSection industries={data?.industries} />

      <div>
        <CardsSwiperWithTitle courses={data?.topCourses} title="Top Courses" />
        <CardsSwiperWithTitle courses={data?.lowPricesCourses} title="Low Prices Courses" />
      </div>
    </div>
  );
}
