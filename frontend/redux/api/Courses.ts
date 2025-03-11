import { apiSlice } from "../services/apiSlice";


const CourseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getAllCoursesPage:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:"/courses/",
                    method:'GET',
                    params:{page:page, size:size}
                })
            }),

            
            getCourseDetailsPage:builder.query({
                query:(id:string)=>({
                    url:`/courses/${id}/`,
                    method:'GET',
                })
            }),

            getCourseContent:builder.query({
                
                query:({id}:{id:string})=>{
                    return{
                    url:`/courses/${id}/learn`,
                    method:'GET',
                }}
            }),

            getSectionContent:builder.mutation({
                
                query:({id,content_id}:{id:string, content_id:string})=>{
                    return{
                    url:`/courses/${id}/learn/contents/${content_id}`,
                    method:'GET',
                }}
            }),
            getUserCourses:builder.query({
                query:()=>({
                    url:`courses/user`,
                    method:'GET',
                })
            }),

            createCourse: builder.mutation({
                query:(form)=>{
                    
                    return {
                        url: `courses/create/`,
                        method: 'POST',
                        body: form,
                    }
                }
            }),
            editCourse: builder.mutation({
                query:({id, form}:{id:string, form:FormData})=>{
                    
                    return {
                        url: `courses/${id}/edit`,
                        method: 'POST',
                        body: form,
                    }
                }
            }),
            deleteCourse: builder.mutation({
                query:({id, password}:{id:string, password:string})=>{
                    
                    return {
                        url: `courses/${id}/delete`,
                        method: 'POST',
                        body: {password},
                    }
                }
            }),
            
    }) 
})


export const {
    useGetAllCoursesPageQuery,
    useGetCourseDetailsPageQuery,
    useGetCourseContentQuery,
    useGetUserCoursesQuery,
    useCreateCourseMutation,
    useGetSectionContentMutation,
    useEditCourseMutation,
    useDeleteCourseMutation
} = CourseApiSlice