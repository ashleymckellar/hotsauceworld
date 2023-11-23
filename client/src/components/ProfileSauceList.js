import React from "react";
import pepper from "../assets/chilipepper.jpg"
import { useNavigate } from "react-router-dom";


function ProfileSauceList(props) {
    const { name, origin, heatRating, description, ingredients, imageUrl, _id } = props
    const navigate =useNavigate()


    const handleDetailsClick = (sauceId) => navigate(`details/${_id}`)
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
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileSauceList;