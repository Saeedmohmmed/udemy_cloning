from django.urls import path
from .views import (
        index,
        GetAllIndustries,
        GetIndustryById,
        GetAllIndustriesAsSelectList,
        GetSubCategoriesFromCategoryAsSelectList,
        GetCategoriesFromIndustryAsSelectList,
        GetAllCategories,
        GetCategoryById,
        GetAllSubCategories,
        GetSubCategoryById
    )

app_name = 'home'

urlpatterns = [
    path('', index, name="index"),
        # industries
    
    path("industries/", GetAllIndustries, name="industries"),
    path("industries-as-select/", GetAllIndustriesAsSelectList, name="industries-select"),
    path("categories-as-select/<str:industry_id>/", GetCategoriesFromIndustryAsSelectList, name="industries-select"),
    path("subcategories-as-select/<str:category_id>/", GetSubCategoriesFromCategoryAsSelectList, name="industries-select"),
    path("industries/<str:id>/", GetIndustryById, name="industry"),
    path("categories/", GetAllCategories, name="industry"),
    path("categories/<str:category_id>/", GetCategoryById, name="industry"),
    path("sub-categories/", GetAllSubCategories, name="industry"),
    path("sub-categories/<str:sub_id>/", GetSubCategoryById, name="industry"),
    
]
