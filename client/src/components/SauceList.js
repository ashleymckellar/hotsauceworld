import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import pepper from '../assets/chilipepper.jpg';

function SauceList(props) {
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
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        comment: null,
    });
    const [showComments, setShowComments] = useState(false);
    const { addComment, hotSauces } = useContext(UserContext);
    const hotSaucesId = props._id;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClick = () => {
        setShowForm(!showForm);
    };

    const handleCommentClick = (e) => {
        console.log('comments shown!');
        setShowComments(!showComments);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.comment) {
            console.log('Comment text is required.');
            return;
        }
        const newComment = {
            comment: formData.comment,
            sauce: hotSaucesId,
        };
        console.log('hotSaucesId', newComment);
        addComment(hotSaucesId, newComment);

        console.log('comment submitted!');
        setFormData({ comment: '' });
        setShowForm(!showForm);
    };

    const handleDetailsClick = (sauceId) => navigate(`details/${_id}`);

    // console.log(hotSauces)

    return (
        <div>
            <div className="row gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-3 py-3">
                <div className="sauce-card">
                    <h4 className="sauce-card-text">{name}</h4>

                    <h5 className="sauce-card-text">Origin: {origin}</h5>

                    <p className="sauce-card-text">
                        Scoville rating:{heatRating}
                    </p>
                    <p className="sauce-card-text">Description:{description}</p>
                    <p className="sauce-card-text">
                        Ingredients: {ingredients}
                    </p>
                    {imageUrl ? (
                        <img src={imageUrl} alt="" className="img-div-card" />
                    ) : (
                        <img src={pepper} alt="" className="img-div-card" />
                    )}

                    <div className="button-container">
                        <button
                            type="submit"
                            className="login-button"
                            onClick={handleDetailsClick}
                        >
                            Details
                        </button>

                        <button
                            type="submit"
                            className="login-button"
                            onClick={handleCommentClick}
                        >
                            {showComments ? 'Hide Comments' : 'Show Comments'}
                        </button>
                    </div>
                    {showComments && (
                        <div>
                            {comments &&
                            Array.isArray(comments) &&
                            comments.length !== 0 ? (
                                <div className="random-comment-section">
                                    <ul className="ul-flex">
                                        {comments.map((comment) => (
                                            <li
                                                key={comment._id}
                                                className="comment-bubble"
                                            >
                                                <p className="sauce-card-text">
                                                    {comment.comment}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <ul className="ul-flex">
                                    <li>Be the first to post a comment.</li>
                                </ul>
                            )}
                        </div>
                    )}
                    {showForm ? (
                        <div className="comment-form-div">
                            <form className="comment-form-div">
                                <input
                                    type="text"
                                    name="comment"
                                    className="comment-form"
                                    onChange={handleChange}
                                    value={formData.comment}
                                />

                                <button
                                    type="submit"
                                    className="comment-submit"
                                    onClick={handleSubmit}
                                    disabled={!formData.comment}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="comment-form-div">
                            <button
                                type="submit"
                                className="login-button"
                                onClick={handleClick}
                            >
                                Add Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SauceList;
