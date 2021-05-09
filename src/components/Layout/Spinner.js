import React from "react";
import spinner from "../../images/spinner.gif";

const Spinner = ({ small }) => {
    return (
        <div
            className={
                small
                    ? "spinner-small d-flex justify-content-center align-items-center"
                    : "spinner d-flex justify-content-center align-items-center"
            }
        >
            <img src={spinner} alt="Loading..." />
        </div>
    );
};

export default Spinner;
