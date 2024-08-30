import React from 'react';
import pepper from '../assets/chilipepper.jpg';
import { useNavigate } from 'react-router-dom';

function ProfileSauceList(props) {
    const {
        name,
        origin,
        heatRating,
        description,
        ingredients,
        imageUrl,
        _id,
    } = props;
    const navigate = useNavigate();

    const handleDetailsClick = (sauceId) => navigate(`details/${_id}`);

    return (
        <div className="col-sm-12 col-md-6 col-lg-6 mb-4">
            <div className="sauce-card">
                <h2 className="card-title">{name}</h2>
                <h4 className="sauce-card-text">Origin: {origin}</h4>
                <p className="sauce-card-text">Scoville rating: {heatRating}</p>
                <p className="sauce-card-text">Description: {description}</p>
                <p className="sauce-card-text">Ingredients: {ingredients}</p>
                <img
                    src={imageUrl || pepper}
                    alt={name}
                    className="img-div-card"
                />
                <div className="card-button-flex">
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
