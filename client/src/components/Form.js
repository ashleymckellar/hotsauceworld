import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider.js'
import CustomModal from './Modal'

import "bootstrap/dist/css/bootstrap.min.css"

function Form(props) {

    const { getSauce, addSauce, getUserSauces } = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => { 
        getSauce();
    }, []);

    const initInputs = { name: props.name || "", heatRating: props.heatRating || "", origin: props.origin || "", description: props.description || "", ingredients: props.ingredients || "", imageUrl: props.imageUrl || "" }; //PUT/Update 
    const [inputs, setInputs] = useState(initInputs);
    const [isSubmitted, setIsSubmitted] = useState(false)//
    const [requiredFieldError, setRequiredFieldError] = useState("")
    const [validationError, setValidationError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target 
        const regex = /^[0-9]+$/;
        console.log(name, value)
        if (name === "heatRating" && !regex.test(value)) { 
            setValidationError("Please enter a valid number.")
            setRequiredFieldError("") 
            return
        }
        setInputs(prevInputs => ({ ...prevInputs, [name]: value })) 
    };

    const handleOpenModal = () => {
        
        setShowModal(true)
        setInputs({
            name: "",
            heatRating: "",
            origin: "",
            description: "",
            ingredients: "",
            imageUrl: "",
            comments:""
        })
        
    };
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleSubmit = (e) => { 
        e.preventDefault() 
        getUserSauces() 
        setIsSubmitted(true)  
        console.log("submitted sauce")
        setInputs({ 
            name: "",
            heatRating: "",
            origin: "",
            description: "",
            ingredients: "",
            imageUrl: "",
            comments:""
        });
        setValidationError("")
        getUserSauces()
        addSauce(inputs)
        handleOpenModal()
    };

    const regex = /^[0-9]+$/;
    const isDisabled = !(inputs.name && inputs.origin) 
    const isError = !(inputs.name && inputs.origin)

    const onRequiredBlur = (e) => {

        const { name, value } = e.target
        console.log(name, value)
        if (!isSubmitted){
            if (value === "") {
            setRequiredFieldError("Please enter a value in required fields.")
        } else {
            setRequiredFieldError("")
        }

    }

}

    const onBlur = (e) => {

        const { name, value } = e.target
        console.log(name, value)
        if (regex.test(value)) {
            setValidationError("")

        }

    }

    return (
        <div className="form-flexbox">

            <form class="mx-auto row g-3" onSubmit={handleSubmit}>
                <div class="col-md-4">
                    <input
                        type="text"
                        class="form-control"
                        name="name" 
                        value={inputs.name} 
                        onChange={handleChange} 
                        onBlur={onRequiredBlur} 
                        placeholder="Sauce Brand Name" />
                </div>
                <div class="col-md-4">
                    <input
                        type="text"
                        class="form-control"
                        name="heatRating"
                        value={inputs.heatRating}
                        onChange={handleChange}
                        onBlur={onBlur}
                        placeholder="Scoville Heat Rating" />
                </div>
                <div class="col-md-4">
                    <input
                        type="text"
                        class="form-control"
                        name="origin"
                        value={inputs.origin}
                        onChange={handleChange}
                        onBlur={onRequiredBlur}
                        placeholder="Origin" />
                </div>
                <div class="col-md-4">
                    <input
                        type="text"
                        class="form-control"
                        
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                        placeholder="Description" />
                </div>
                <div class="col-md-4">
                    <input
                        type="text"
                        class="form-control"
                        name="ingredients"
                        value={inputs.ingredients}
                        onChange={handleChange}
                        placeholder="Ingredients" />
                </div>
                <div class="col-md-4">
                    <input
                        type="text"
                        class="form-control"
                        name="imageUrl"
                        value={inputs.imageUrl}
                        onChange={handleChange}
                        placeholder="Image URL" />
                </div>


                {validationError && <p style={{ color: 'red' }}>{validationError}</p>} 
                {isError && <p style={{ color: 'red' }}>{requiredFieldError}</p>}
                <div className="submit-btn-div">
                    <button type="submit" class="btn btn-danger" onClick={handleSubmit} disabled={isDisabled}>Submit</button>
                <br></br>
                </div>
                <CustomModal show={showModal} handleClose={handleCloseModal}/>
            </form>
         
            {/* {isSubmitted && (
                <>
                    <h1 style={{ color: 'orange' }}>Thank you for submitting a new sauce!</h1>
                    
                 
                  
                </>
            )} */}
        </div>
    )
}



export default Form;