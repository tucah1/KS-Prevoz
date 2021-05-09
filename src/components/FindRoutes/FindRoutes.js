import React from "react";
import Map from "./Map";

const FindRoutes = () => {
    return (
        <>
            <div className="position-relative">
                <div className="background-wrapper">
                    <div className="background-col"></div>
                    <div className="background-wave"></div>
                </div>
                <div className="container paddingTop">
                    <div className="main-heading-wrapper">
                        <div className="main-heading-line">
                            <div className="main-heading">Find routes</div>
                        </div>
                    </div>
                </div>
                <div className="find-routes-main">
                    <Map />
                </div>
            </div>
        </>
    );
};

export default FindRoutes;
