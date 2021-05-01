import React from "react";
import spinner from "../images/spinner.gif";

const Spinner = () => {
    return (
        <div className="spinner d-flex justify-content-center align-items-center">
            {/* <img src={spinner} alt="Loading" /> */}
            <p>Loading...</p>
        </div>
    );
};

export default Spinner;
