import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"


// registerAPI calledby auth component
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/register`,reqBody)
}

// loginAPI called bu auth component
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/login`,reqBody)
}

//addProjectAPI callled by Add component when user clicked on add button
// http://localhost:3000/add-project
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/add-project`,reqBody,reqHeader)
}

// getHomeProjectAPI called by home component when page loaded
export const getHomeProjectAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/home-project`,{})
}


export const allProjectAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/all-project?search=${searchKey}`,{},reqHeader)
}

// userProjectAPI used by view cmponent
export const userProjectAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/user-project`,{},reqHeader)
}

// update
export const updateProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/projects/${id}/edit`,reqBody,reqHeader)
}

// userProjectDeleteAPI called by view component when user click on delete button
export const userProjectDeleteAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVERURL}/projects/${id}/remove`,{},reqHeader)
}

// update user called by profile component when user clickon update button
export const updateUserAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/edit-user`,reqBody,reqHeader)
}




