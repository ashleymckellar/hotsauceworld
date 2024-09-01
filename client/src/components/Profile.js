import React, { useContext, useEffect } from 'react'
import Form from './Form.js'
import { UserContext } from '../context/UserProvider.js'
import ProfileSauceContainer from './ProfileSauceContainer'

export default function Profile(props){
    const { user: { username }, getUserSauces, userSauceState, addSauce } = useContext(UserContext)
    const {comment} = props


    useEffect(() => {
        getUserSauces(); 
       
    }, [])

    


    return (
        <div className="py-3 text-center">
                <h1 className='username'> Welcome @{username}</h1>
                <br></br>
                <br></br>
                <h3 className='username'>Submit a new sauce</h3>
                <br></br>
                <Form addSauce={addSauce} />
                <div className='py-20'>
                    <h2 className='profile-sauce-container py-20'>Your Submitted Sauces</h2>
                </div>
                <section >
                    <div>
                        <div>
                        
                    {!userSauceState ? (
                    <ProfileSauceContainer sauces={userSauceState} />
                    ) : (
                    <p> Loading sauces...</p>
                    )}
                        </div>
                    </div>
                    
                </section>
                
            </div>
        )

}