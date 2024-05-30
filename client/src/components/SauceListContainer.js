import { React, useEffect, useContext } from "react";
import SauceList from "./SauceList"; 
import { UserContext } from "../context/UserProvider"


function SauceListContainer() {

    const { hotSauces, getSauce } = useContext(UserContext) 

    useEffect(() => { 
        getSauce();
    }, []);

    return (
        <div className="sauce-box">
            <h1 className="sauces-h1">Sauces</h1>
            <div className="bg-white py-3">
                <div className="sauce-container-div">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
                        {hotSauces.map((sauce) => (
                            <SauceList {...sauce} key={sauce._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SauceListContainer;