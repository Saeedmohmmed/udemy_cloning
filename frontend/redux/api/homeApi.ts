import { apiSlice } from "../services/apiSlice";


const homeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getIndexPage: builder.query({
                query:()=>({
                    url:""
                }),
                
            }),
            getIndustries: builder.query({
                query:()=>({
                    url:"industries-as-select/"
                })
            }),
            getCategories: builder.mutation({
                query:({id})=>({
                    
                    url:`categories-as-select/${id}`
                })
            }),
            getSubCategories: builder.mutation({
                query:({id})=>({
                    url:`subcategories-as-select/${id}`
                })
            }),
    }) 
})


export const {
    useGetIndexPageQuery,
    useGetIndustriesQuery,
    useGetCategoriesMutation,
    useGetSubCategoriesMutation
    
} = homeApiSlice