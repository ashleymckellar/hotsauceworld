import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider.js';
import CustomModal from './Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

function Form(props) {
    const { getSauce, addSauce, getUserSauces } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getSauce();
    }, []);

    const initInputs = {
        name: props.name || '',
        heatRating: props.heatRating || '',
        origin: props.origin || '',
        description: props.description || '',
        ingredients: props.ingredients || '',
        imageUrl: props.imageUrl || '',
    }; //PUT/Update
    const [inputs, setInputs] = useState(initInputs);
    const [isSubmitted, setIsSubmitted] = useState(false); //
    const [requiredFieldError, setRequiredFieldError] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[0-9]+$/;

        if (name === 'heatRating' && !regex.test(value)) {
            setValidationError('Please enter a valid heat rating number.');
            setRequiredFieldError('');
            return;
        }
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    const handleOpenModal = () => {
        setShowModal(true);
        setInputs({
            name: '',
            heatRating: '',
            origin: '',
            description: '',
            ingredients: '',
            imageUrl: '',
            comments: null,
        });
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getUserSauces();
        setIsSubmitted(true);
        setInputs({
            name: '',
            heatRating: '',
            origin: '',
            description: '',
            ingredients: '',
            imageUrl: '',
            comments: null,
        });
        setValidationError('');
        getUserSauces();
        addSauce(inputs);
        handleOpenModal();
    };

    const regex = /^[0-9]+$/;
    const isDisabled = !(inputs.name && inputs.origin);
    const isError = !(inputs.name && inputs.origin);

    const onRequiredBlur = (e) => {
        const { name, value } = e.target;

        if (!isSubmitted) {
            if (value === '') {
                setRequiredFieldError(
                    'Please enter a value in required fields.',
                );
            } else {
                setRequiredFieldError('');
            }
        }
    };

    const onBlur = (e) => {
        const { name, value } = e.target;
        if (regex.test(value)) {
            setValidationError('');
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="form-inner-div flex-grow-1">
                <form onSubmit={handleSubmit} className="form">
                    <div class="col-md-4">
                        <input
                            type="text"
                            className="sauce-form-input"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                            onBlur={onRequiredBlur}
                            placeholder="Sauce Brand Name"
                        />
                    </div>
                    <div class="col-md-4">
                        <input
                            type="text"
                            className="sauce-form-input"
                            name="heatRating"
                            value={inputs.heatRating}
                            onChange={handleChange}
                            onBlur={onBlur}
                            placeholder="Scoville Heat Rating"
                        />
                    </div>
                    <div class="col-md-4">
                        <input
                            type="text"
                            className="sauce-form-input"
                            name="origin"
                            value={inputs.origin}
                            onChange={handleChange}
                            onBlur={onRequiredBlur}
                            placeholder="Origin"
                        />
                    </div>
                    <div class="col-md-4">
                        <input
                            type="text"
                            className="sauce-form-input"
                            name="description"
                            value={inputs.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                    </div>
                    <div class="col-md-4">
                        <input
                            type="text"
                            className="sauce-form-input"
                            name="ingredients"
                            value={inputs.ingredients}
                            onChange={handleChange}
                            placeholder="Ingredients"
                        />
                    </div>
                    <div class="col-md-4">
                        <input
                            type="text"
                            className="sauce-form-input"
                            name="imageUrl"
                            value={inputs.imageUrl}
                            onChange={handleChange}
                            placeholder="Image URL"
                        />
                    </div>

                    {validationError && (
                        <p style={{ color: 'white', padding: '10px' }}>
                            {validationError}
                        </p>
                    )}
                    {isError && (
                        <p style={{ color: 'white', padding: '10px' }}>
                            {requiredFieldError}
                        </p>
                    )}
                    <div className="submit-btn-div">
                        <button
                            type="submit"
                            className="login-button"
                            onClick={handleSubmit}
                            disabled={isDisabled}
                        >
                            Submit
                        </button>
                        <br></br>
                    </div>
                    <CustomModal
                        show={showModal}
                        handleClose={handleCloseModal}
                    />
                </form>

                {/* {isSubmitted && (
                <>
                    <h1 style={{ color: 'orange' }}>Thank you for submitting a new sauce!</h1>
                    
                 
                  
                </>
            )} */}
            </div>
        </div>
    );
}

export default Form;
