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
            <h1 className="username">Sauces</h1>
            <div className=" py-3">
                <div>
                    <div className="row gx-4 gx-lg-5 mx-5 row-cols-1 row-cols-md-2 row-cols-xl-4">
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