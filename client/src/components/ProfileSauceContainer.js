import { React, useContext } from "react";
import ProfileSauceList from "./ProfileSauceList";
import { Container, Row } from "react-bootstrap";
import { UserContext } from '../context/UserProvider.js'

function ProfileSauceContainer(){
     const { userSaucesState } = useContext(UserContext)
     
    

    return (
        <Container>
            <Row>
           
            {userSaucesState.map(sauce => (
            
                <ProfileSauceList {...sauce} key={sauce._id} />
                
            ))}
            </Row>
            </Container>
    
    );
};


export default ProfileSauceContainer