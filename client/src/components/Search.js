import React from "react"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider"
import SauceList from "./SauceList";


 function Search() {
   const { hotSauces, getSauce } =useContext(UserContext)
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [filteredSauces, setFilteredSauces] = useState([])
   const [inputData, setInputData] = useState({})


   useEffect(() => { 
        getSauce();
    }, [filteredSauces]);


   const handleInputChange = (e) => {
        setInputData((prevData) => ({...prevData, [e.target.name]: e.target.value}))
   }

   const handleSubmit = (e) => {
        e.preventDefault()
        const filteredSauces = hotSauces.filter((sauce) => {
            const howHot = sauce.heatRating <= inputData.heat
            return howHot

        })
        setFilteredSauces(filteredSauces)
        setIsSubmitted(true)
   }

   const isDisabled = !inputData.heat || isNaN(Number(inputData.heat));


return (
    <div className="container px-3">
        <div className="search-container">
            <div className="search-form px-3">
                <h3 className="search-form-text">
                    Just how hot do you want to go? Find your perfect sauce
                    below!{" "}
                </h3>
                <br></br>
                <p className="search-form-text">How many Scoville Heat Units can you handle?</p>
                <label className="username">0 - 5000000</label>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <input
                        min={0}
                        max={5000000}
                        type="range"
                        name="heat"
                        className="range-slider"
                        value={inputData.heatRating}
                        onChange={handleInputChange}
                    />
                    {inputData.heatRating}
                    <p className="search-form-text">{inputData.heat}</p>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={isDisabled}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>

            {isSubmitted && filteredSauces && filteredSauces.length === 0 && (
                <h5> No sauces found. Please refine your search criteria. </h5>
            )}

            {isSubmitted && filteredSauces && filteredSauces.length > 0 && (
                <div className="row px-3">
                    {filteredSauces.map((sauce) => (
                        <div className="col mb-4" key={sauce._id}>
                            <SauceList {...sauce} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);
}
export default Search