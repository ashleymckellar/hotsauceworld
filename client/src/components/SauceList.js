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
        <div className="col-sm-3 col-lg-3 img-fluid rounded mx-auto d-block">
            <div className="card col mb-5">
                <div className="h-350">
                    <div className="card-body p-4">
                        <div className="text-center">

                            <h2>{name}</h2>
                            <h4>birth place: {origin}</h4>
                            <p>Scoville rating:{heatRating}</p>
                            <p>Description:{description}</p>
                            <p>Ingredients: {ingredients}</p>
                            {imageUrl ? (
                                <img src={imageUrl} className="submitted-pic card-img-top cardsize" />
                            ) : (
                                <img src={pepper} className="pepper submitted-pic card-img-top cardsize"/>
                            )
                }
                            <br></br>
                            <br></br>
                            <button type="submit" class="btn btn-danger" onClick={handleDetailsClick}>Details</button>
                            <br></br>
                            <br></br>
                            <button type="submit" class="btn btn-danger" onClick={handleCommentClick}>
                            {showComments ? "Hide Comments" : "Show Comments"}
                            </button>
                            <br></br>
                            <br></br>
                            {showComments ? (
                                <div>
                            <h3>Comments</h3> 
                             <div className=" .bg-body-secondary">
                                <ul>
                                    {comments && Array.isArray(comments) ? (
                                        comments.map((comment) => (
                                        <li key={comment._id}>
                                            <p>{comment.comment}</p>
                                            <br></br>
                                            <br></br>
                                        </li>
                                    ))
                                ) : (
                                    <li>No comments found.</li>
                                )}
                                </ul>
                            </div> 
                            </div>
                            ) : null }
                   
             <button type="submit" class="btn btn-danger" onClick={handleClick}>Add Comment</button>
            <br></br>
            <br></br>
            {showForm? (
                <form>
                    <input
                    type="text"
                        name="comment"
                        onChange={handleChange}
                        value={formData.comment}
                    />
                        <br></br>
                        <br></br>
                    <button type="submit" class="btn btn-danger" onClick={handleSubmit} disabled={!formData.comment}>Submit</button>
                </form>
            ) : null}
            
                     </div>
                </div>
            </div>
        </div>
    </div>               
    )
};

export default SauceList;