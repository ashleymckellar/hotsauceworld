///bug: page has to be refreshed for new comment to appear



import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import pepper from "../assets/chilipepper.jpg"


function SauceList(props) {
    const { name, origin, heatRating, description, ingredients, imageUrl, comments, _id } = props
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        comment:""
    })
    const [showComments, setShowComments] = useState(false)
    const { addComment, hotSauces } = useContext(UserContext)
    const hotSaucesId = props._id
    const navigate =useNavigate()

        const handleChange = (e) => {
        setFormData((prevFormData) => ({...prevFormData, [e.target.name]: e.target.value}))
    }

    const handleClick = () => {
        
        setShowForm(true)
    }

    const handleCommentClick = (e) => {
        console.log("comments shown!")
        setShowComments(!showComments)
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        if(!formData.comment){
            console.log("Comment text is required.")
            return
        }
        const newComment = {
            comment: formData.comment,
            sauce: hotSaucesId
            
        };
        console.log("hotSaucesId", newComment)
        addComment(hotSaucesId, newComment);
        
        console.log("comment submitted!")
        setFormData({ comment: ""})
        setShowComments(true)
        
    }

    const handleDetailsClick = (sauceId) => navigate(`details/${_id}`)

    // console.log(hotSauces)

    return (
        <div className="">
            <div className="card col mb-5">
                <div className="h-200">
                    <div className="card-body p-3">
                        <div className="sauce-card">
                            <h4>{name}</h4>
                            <br></br>
                            <h5>Origin: {origin}</h5>
                            <br></br>
                            <p>Scoville rating:{heatRating}</p>
                            <p>Description:{description}</p>
                            <p>Ingredients: {ingredients}</p>
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    className="submitted-pic card-img-top cardsize"
                                />
                            ) : (
                                <img
                                    src={pepper}
                                    className="pepper submitted-pic card-img-top cardsize"
                                />
                            )}

                            <div className="button-container">
                                <button
                                    type="submit"
                                    className="sauce-details-btn"
                                    onClick={handleDetailsClick}
                                >
                                    Details
                                </button>

                                <button
                                    type="submit"
                                    className="show-comments-btn"
                                    onClick={handleCommentClick}
                                >
                                    {showComments
                                        ? "Hide Comments"
                                        : "Show Comments"}
                                </button>
                                
                            </div>
                            {showComments && (
                                <div className="card-comments-parent">
                                    <h3>Comments</h3>
                                <div className="card-comments-div">
                                    
                                    <div className=" .bg-body-secondary">
                                        <div>
                                        <ul>
                                            {comments &&
                                            Array.isArray(comments) ? (
                                                comments.map((comment) => (
                                                    <li key={comment._id} className="comment-bubble">
                                                        <p>{comment.comment}</p>
                                                        
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No comments found.</li>
                                            )}
                                        </ul>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="add-comments-btn"
                                onClick={handleClick}
                            >
                                Add Comment
                            </button>
                            <br></br>
                            <br></br>
                            {showForm && (
                                <form>
                                    <input
                                        type="text"
                                        name="comment"
                                        onChange={handleChange}
                                        value={formData.comment}
                                    />
                                    <br></br>
                                    <br></br>
                                    <button
                                        type="submit"
                                        class="btn btn-danger"
                                        onClick={handleSubmit}
                                        disabled={!formData.comment}
                                    >
                                        Submit
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SauceList;