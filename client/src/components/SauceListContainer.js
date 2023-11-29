import { React, useEffect, useContext } from "react";
import SauceList from "./SauceList"; 
import { UserContext } from "../context/UserProvider"


function SauceListContainer() {

    const { hotSauces, getSauce } = useContext(UserContext) 

    useEffect(() => { 
        getSauce();
    }, []);

    return (
        <>
            <h1>Sauces</h1>
            <section className="bg-light py-3">
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {hotSauces.map(sauce => (
                <SauceList {...sauce} key={sauce._id} />
                      
            ))}
              </div>
                    </div>
                    </section>
        </>
    );
};


export default SauceListContainer;