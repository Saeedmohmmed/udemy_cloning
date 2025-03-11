import { apiSlice } from "../services/apiSlice";


const InstructorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getIndexPage:builder.query({
                query:()=>({
                    url:"instructor/",
                    method:'GET',
                })
            }),
            getCourseListPage:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:"instructor/courses/",
                    method:'GET',
                    params:{page:page, size:size}
                })
            }),
            getCourseStaticsPage:builder.query({
                query:({id}:{id:string})=>({
                    url:`instructor/courses/${id}/manage/`,
                    method:'GET',
                }),
                providesTags: ['contents'],
            }),
            getCourseBase:builder.query({
                query:({id}:{id:string})=>({
                    url:`instructor/courses/${id}/`,
                    method:'GET',
                }),
                providesTags:['course_base']
            }),
            getCourseSectionsAndContentPage:builder.query({
                query:({id}:{id:string})=>({
                    url:`instructor/courses/${id}/manage/sections/`,
                    method:'GET',
                }),
                providesTags: ['contents'],
            }),

            deleteCourseContent:builder.mutation({
                query:({content_id}:{content_id:string})=>({
                    url:`instructor/contents/${content_id}/delete/`,
                    method:'DELETE',
                }),
                invalidatesTags: ['contents']
            }),
            addCourseContent:builder.mutation({
                query:({course_id, section_id, name}:{course_id:string, section_id:string, name:string})=>({
                    url:`instructor/courses/${course_id}/manage/sections/${section_id}/`,
                    method:'POST',
                    body: {name: name}
                }),
                invalidatesTags: ['contents']
            }),

            editCourseContent:builder.mutation({
                query:({content_id, form}:{content_id:string, form:FormData})=>({
                    url:`instructor/contents/${content_id}/edit/`,
                    method:'POST',
                    body: form
                }),
                invalidatesTags: ['contents']
            }),

            addNewSection:builder.mutation({
                query:({course_id, section_name}:{course_id:string, section_name:string})=>({
                    url:`instructor/courses/${course_id}/manage/sections/create/`,
                    method:'POST',
                    body: {section_name}
                }),
                invalidatesTags: ['contents']
            }),
            DeleteSection:builder.mutation({
                query:({section_id}:{section_id:string})=>({
                    url:`instructor/sections/${section_id}/delete/`,
                    method:'DELETE',
                }),
                invalidatesTags: ['contents']
            }),
        }) 
})
    
    
export const {
    useGetIndexPageQuery,
    useGetCourseListPageQuery,
    useGetCourseStaticsPageQuery,
    useGetCourseSectionsAndContentPageQuery,
    useDeleteCourseContentMutation,
    useAddCourseContentMutation,
    useEditCourseContentMutation,
    useGetCourseBaseQuery,
    useAddNewSectionMutation,
    useDeleteSectionMutation
} = InstructorsApiSlice