import { useState, useEffect, useContext } from 'react';
import pepper from "../assets/chilipepper.jpg"

import { UserContext } from '../context/UserProvider.js';

export default function RandomSauce(props) {
    const { userSaucesState, getRandomSauce, theRandomSauce } = useContext(UserContext);
    const { name, origin, heatRating, description, ingredients, imageUrl, comments, _id } = props
    console.log(theRandomSauce)
   

    return (
        <div>
            <button onClick={() => getRandomSauce()}>Get Random Sauce!</button>
            <div>
               <h1>{theRandomSauce.name}</h1>
               <p>{theRandomSauce.heatRating}</p>
               <p>{theRandomSauce.origin}</p>
               {imageUrl ? (
                        <img src={imageUrl} className="submitted-pic card-img-top cardsize" />
                    ) : (
                        <img src={pepper} className="pepper submitted-pic card-img-top cardsize"/>
                    )
                    } 
               
               <img src={theRandomSauce.imageUrl} alt =""/>
            </div>
        </div>
    );
}
