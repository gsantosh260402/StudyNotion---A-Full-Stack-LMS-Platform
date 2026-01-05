
import { setUser } from "../../slices/profileSlice";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";


const {

  GET_USER_DETAILS_API , GET_USER_ENROLLED_COURSES_API

} = profileEndpoints

export function getUserDetails(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "GET",
        GET_USER_DETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      dispatch(setUser(response.data.data));  // SUCCESS

    } catch (error) {
      console.log("Token expired or invalid.");

      // CLEAR TOKEN & USER
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      dispatch(setUser(null));
      dispatch({ type: "auth/setToken", payload: null }); // FIX

    }
  };
}

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    }
    catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}