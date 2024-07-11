import { useState, useEffect, useContext } from 'react';
import pepper from '../assets/chilipepper.jpg';

import { UserContext } from '../context/UserProvider.js';

export default function RandomSauce(props) {
    const { userSaucesState, getRandomSauce, theRandomSauce } =
        useContext(UserContext);
    const {
        name,
        origin,
        heatRating,
        description,
        ingredients,
        imageUrl,
        comments,
        _id,
    } = props;
    console.log(theRandomSauce);

    return (
        <div className='bg-white py-3 text-center'>
            <button className='btn btn-danger' onClick={() => getRandomSauce()}>Get Random Sauce!</button>
            <div className="details-div">
                <div className="bg-white py-3 text-center">
                    <h1>{theRandomSauce.name}</h1>
                 
                    {theRandomSauce.imageUrl &&
                    theRandomSauce.imageUrl !== null ? (
                        <img
                            src={theRandomSauce.imageUrl}
                           
                            alt="hot sauce"
                            className="details-pic"
                        />
                    ) : (
                        <img
                            src={pepper}
                            className="pepper submitted-pic card-img-top cardsize"
                            alt="pepper"
                        />
                    )}
                       <h5>
                        {' '}
                        Heat Rating (Scoville Units): {' '}
                        {theRandomSauce.heatRating}
                    </h5>
                    <h5>Origin: {theRandomSauce.origin}</h5>
                    <h5>Description: {theRandomSauce.description}</h5>
                    <h5>ingredients: {theRandomSauce.ingredients}</h5>

                </div>
            </div>
        </div>
    );
}
