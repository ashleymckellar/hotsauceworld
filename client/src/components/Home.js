import React from 'react';
import Auth from "./Auth.js"
import chiliPepper from "../assets/two-red-chili-peppers.jpg"
import chilipeppers from "../assets/chili-peppers.jpeg";



function Home() {
    

    return (
        <div
            className="welcome mx-auto row g-3 py-5 my-5"
            style={{ backgroundImage: { chilipeppers } }}
        >
           
                <h1 className="world">Hot Sauce World</h1>
                <br></br>
              
                {/* <img src={chiliPepper} className='two-red-chili-peppers'/> */}
                
                    <Auth />
                    <div className='py-5'>
                    <img src={chilipeppers} alt="chili peppers" className='chili-img img-fluid'/>

                </div>
            </div>
       
    );
};


export default Home;