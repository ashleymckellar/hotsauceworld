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
        <div className="d-flex justify-content-center align-items-center">
            <div
                className="d-flex flex-column justify-content-center align-items-center mt-5"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    borderRadius: '20px',
                    backgroundColor: '#E55139',
                    padding: '5vh',
                }}
            >
                <button
                    className="login-button"
                    onClick={() => getRandomSauce()}
                >
                    Get Random Sauce!
                </button>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3 p-5 m-3">
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
                    <div
                        className="d-flex flex-column align-items-center p-2 m-5"
                        style={{
                            borderRadius: '20px',
                            width: '100%',
                           
                            maxWidth: '500px',
                            border: 'none',
                            backgroundColor: '#FED7B2',
                        }}
                    >
                        .
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
                    </div>
                    <div className="random-comments-parent">
                        <h3 className="details-title">User Comments</h3>
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
