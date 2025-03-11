import { apiSlice } from "../services/apiSlice";


const IndustriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getAllIndustries:builder.query({
            query:()=>({
                url:"/industries/",
                method:'GET',
            })
        }),    
        getIndustryById:builder.query({
            query:({id}:{id:string})=>({
                url:`/industries/${id}`,
                method:'GET',
            })
        }),  
        getAllcategories:builder.query({
            query:()=>({
                url:"/categories/",
                method:'GET',
            })
        }),   
        getCategoryById:builder.query({
            query:({category_id}:{category_id:string})=>({
                url:`/categories/${category_id}/`,
                method:'GET',
            })
        }),      
        getSubCategoryById:builder.query({
            query:({sub_id}:{sub_id:string})=>({
                url:`/sub-categories/${sub_id}/`,
                method:'GET',
            })
        }),
        getSubCategories:builder.query({
            query:()=>({
                url:`/sub-categories/`,
                method:'GET',
            })
        }),
    }) 
})



export const {
    useGetAllIndustriesQuery,
    useGetIndustryByIdQuery,
    useGetCategoryByIdQuery,
    useGetAllcategoriesQuery,
    useGetSubCategoryByIdQuery,
    useGetSubCategoriesQuery    
} = IndustriesApiSlice