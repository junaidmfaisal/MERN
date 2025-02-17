import React, { useState,createContext } from 'react'
export const addprojectResponseContext = createContext()
export const editprojectResponseContext = createContext()


const ContextAPI = ({children}) => {
    const [editProjectResponse,setEditProjectResponse] = useState("")
    const [addProjectResponse,setAddProjectResponse]  = useState("")
  return (
    <editprojectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
    <addprojectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
           {children}
    </addprojectResponseContext.Provider>
    </editprojectResponseContext.Provider>
  )
}

export default ContextAPI