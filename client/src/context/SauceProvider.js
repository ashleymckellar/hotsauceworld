import React, { useState } from 'react'
import axios from 'axios'
export const SauceContext = React.createContext()
const sauceAxios = axios.create()

sauceAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

//http://localhost:8100/sauces is endpoint for sauces

export default function SauceProvider(props){
    const [hotSauces, setHotSauces] = useState([])
    const hotSaucesId = hotSauces.map((sauce) => sauce._id)


// async function getSauceComments(hotSaucesId){
//     try {
//         const response = await sauceAxios.get(`/api/comment/${hotSaucesId}`)
//         return response.data
//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }

   


return (
    <SauceContext.Provider
        value={{
            hotSauces,
        
            hotSaucesId
        }}>
        {props.children}
    </SauceContext.Provider>
)
    }