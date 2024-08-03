

import React from "react";
import pepper from "../assets/chilipepper.jpg";
import { useNavigate } from "react-router-dom";

function ProfileSauceList(props) {
    const { name, origin, heatRating, description, ingredients, imageUrl, _id } = props;
    const navigate = useNavigate();

    const handleDetailsClick = (sauceId) => navigate(`details/${_id}`) ;

    return (
        <div className="col-sm-12 col-md-6 col-lg-6 mb-4">
            <div className="card h-100">
                <img
                    src={imageUrl || pepper}
                    alt={name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <h4 className="card-subtitle mb-2 text-muted">Birth place: {origin}</h4>
                    <p className="card-text">Scoville rating: {heatRating}</p>
                    <p className="card-text">Description: {description}</p>
                    <p className="card-text">Ingredients: {ingredients}</p>
                    <button
                        type="button"
                        className="details-button"
                        onClick={() => handleDetailsClick(_id)}
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileSauceList;
