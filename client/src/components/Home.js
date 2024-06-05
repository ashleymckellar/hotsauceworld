import React from 'react';
import Auth from "./Auth.js"
import chiliPepper from "../assets/two-red-chili-peppers.jpg"
import chilipeppers from "../assets/chili-peppers.jpeg";



function Home() {
    

    return (
        <div
            className="welcome mx-auto row g-3 p-5"
            style={{ backgroundImage: { chilipeppers } }}
        >
           
                <h1 className="world">Hot Sauce World</h1>
                <br></br>
                <h2 className="ready">
                    Ready to spice things up? Sign up or log in below to view
                    our world of hot sauces
                </h2>
                {/* <img src={chiliPepper} className='two-red-chili-peppers'/> */}
                <div>
                    <Auth />
                    <img src={chilipeppers} alt="chili peppers"/>
                </div>
            
        </div>
    );
};


export default Home;