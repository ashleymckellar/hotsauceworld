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
   console.log(inputData)
   console.log(hotSauces)
   console.log(filteredSauces)

return (
    <div className="container">
        <div className="bg-white py-3 text-center">
            <h3>
                Just how hot do you want to go? Find your perfect sauce below!{" "}
            </h3>
            <br></br>
            <p>How many Scoville Heat Units can you handle?</p>
            <label>0 - 5000000</label>
            <br></br>
            <form onSubmit={handleSubmit}>
                <input
                    min={0}
                    max={5000000}
                    type="range"
                    name="heat"
                    style={{ width: "300px" }}
                    value={inputData.heatRating}
                    onChange={handleInputChange}
                />
                {inputData.heatRating}
                <p>{inputData.heat}</p>
                <button
                    type="submit"
                    class="btn btn-danger"
                    disabled={isDisabled}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>

            {isSubmitted && filteredSauces && filteredSauces.length === 0 && (
                <h5> No sauces found. Please refine your search criteria. </h5>
            )}

            {isSubmitted && filteredSauces && filteredSauces.length > 0 && (
                <div className="row">
                {filteredSauces.map((sauce) => (
                    <div className="col-md-4 mb-4" key={sauce._id}>
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