import type { Metadata } from 'next'
import DetailsPage from './_components/Details.page'

type Props = {
  params: { id: string }
}
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const {id} = params
   // fetch data
  //  const data = await fetch(`http://localhost:8000/api/courses/${id}/name`).then((res) => res.json())
 
  
   return {
     title: `Coursatty`,
   }
 }

export default function Page({ params }: Props) {
  
  return(
    <div className='xl:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hiddenw-[80%] p-5'>
      <DetailsPage id={params.id} />
    </div>
  )
}