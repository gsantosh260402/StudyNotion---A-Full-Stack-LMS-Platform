import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

const { categories } = require("../apis");

const {CATEGORIES_API} = categories;

export async function fetchAllCategories(){
    let result;
    try{
        
        const response = await apiConnector("GET" , CATEGORIES_API , null , null);
        
        result = response?.data?.data;
    }catch(error){
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
        //result = error.response.data
        toast.error(error.response.data.message);
    }

    return result;
}