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
        <div className="random-main">
            <button className="login-button" onClick={() => getRandomSauce()}>
                Get Random Sauce!
            </button>
            <div className="random-parent-div">
              
                    <h1 className="search-form-text">{theRandomSauce.name}</h1>

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
                            alt="pepper"
                            className="details-pic"
                        />
                    )}
                    <div className="random-div">.
                        
                        <div className="random-text-div">
                         
                            <h5 className="details-text">
                                Origin: {theRandomSauce.origin}
                            </h5>
                            <h5 className="details-text">
                                {' '}
                                Heat Rating (Scoville Units):{' '}
                                {theRandomSauce.heatRating}
                            </h5>
                            <h5 className="details-text">
                                Description: {theRandomSauce.description}
                            </h5>
                            <h5 className="details-text">
                                Ingredients: {theRandomSauce.ingredients}
                            </h5>
                        
                        </div>
                        <div className='random-comments-parent'>
                        <h3 className='details-title'>User Comments</h3>
                        <div className="random-comment-section">
                            
                            <ul>
                                {theRandomSauce &&
                                Array.isArray(theRandomSauce.comments) &&
                                theRandomSauce.comments.length > 0 ? (
                                    theRandomSauce.comments.map((comment) => (
                                        <li
                                            className="comment-bubble"
                                            key={comment._id}
                                        >
                                            <p>{comment.comment}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>No comments posted yet.</li>
                                )}
                            </ul>
                        </div>
                        </div>
                    </div>
                
            </div>
        </div>
    );
}
