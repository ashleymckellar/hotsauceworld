import React from 'react';
import Auth from "./Auth.js"
import chiliPepper from "../assets/two-red-chili-peppers.jpg"

//couldn't get the color gradient to span the entire page
//would probably also add an image here but had issues getting it formatted to the correct size

function Home() {
    

    return (
        <div className='welcome mx-auto row g-3'>
            <h1 className='world'>Hot Sauce World</h1>
            <br></br>
            <h2 className='ready'>Ready to spice things up?  Sign up or log in below to view our world of hot sauces</h2>
            {/* <img src={chiliPepper} className='two-red-chili-peppers'/> */}
        <div>
                <Auth />
            </div>
        </div>
    )
};


export default Home;