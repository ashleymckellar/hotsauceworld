


import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import pepper from "../assets/chilipepper.jpg"

function Details(props){
    // const { name, origin, heatRating, description, ingredients, imageUrl, comments, _id } = props
    const { sauceId } = useParams();
    const { addComment, hotSauces, getSauceById, hotSauceById, setHotSauceById } = useContext(UserContext);
    const [foundSauce, setFoundSauce] = useState({});
    const [formData, setFormData] = useState({
        comment: "",
    });
    // const hotSaucesId = foundSauce._id
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.comment) {
            console.log("Comment text is required.");
            return;
        }
        const newComment = {
            comment: formData.comment,
            sauce: sauceId,
        };
        console.log("sauceId", newComment);
        // console.log(hotSaucesId)
        // console.log(foundSauce)
        addComment(sauceId, newComment);

        console.log("comment submitted!");
        setFormData({ comment: "" });
    };

    // console.log(hotSauces)
    // console.log(foundSauce)

    const handleClick = () => {
        setShowForm(true);
    };

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const sauce = hotSauces.find((salsa) => salsa._id === sauceId);
        setFoundSauce(sauce);
    }, [hotSauces, setFoundSauce]);

    console.log(foundSauce);
    return (
        <div className="details-div">
            <div className="bg-white py-3 text-center">
                <h3>{!!foundSauce && foundSauce.name}</h3>
                
                    {!!foundSauce &&
                    foundSauce.imageUrl &&
                    foundSauce.imageUrl !== null ? (
                        <img
                            src={foundSauce.imageUrl}
                            className="details-pic"
                        />
                    ) : (
                        <img src={pepper} className="pepper" />
                    )}
                
                
                <h5>Origin: {!!foundSauce && foundSauce.origin}</h5>
                <h5>
                    Heat Rating (Scoville Units):
                    {!!foundSauce && foundSauce.heatRating}
                </h5>
                <h5>Description:{!!foundSauce && foundSauce.description}</h5>
                <h5>Ingredients:{!!foundSauce && foundSauce.ingredients}</h5>

                <h3>Comments</h3>
                <div className="comment-container">
                    <ul>
                        {foundSauce && Array.isArray(foundSauce.comments) ? (
                            foundSauce.comments.map((comment) => (
                                <li
                                    className="comment-bubble"
                                    key={comment._id}
                                >
                                    <p>{comment.comment}</p>
                                </li>
                            ))
                        ) : (
                            <li>No comments available.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Details;



