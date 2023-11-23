import { React, useEffect, useContext } from "react";
import ProfileSauceList from "./ProfileSauceList";
import { UserContext } from '../context/UserProvider.js'

function ProfileSauceContainer(){
     const { userSaucesState } = useContext(UserContext)
     

    return (
        <>
           
            {userSaucesState.map(sauce => (
            
                <ProfileSauceList {...sauce} key={sauce._id} />
                
            ))}
        </>
    );
};


export default ProfileSauceContainer