import React from "react";
import illustration from "../../images/headingillustration.png";

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="bottom-wave"></div>

                <div className="container-fluid header-landing d-flex flex-row justify-content-between align-items-center">
                    <div className="heading-quote">
                        <h1>
                            Never be <br />
                            late again
                        </h1>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Eligendi saepe consectetur unde aut provident
                        </p>
                        <a href="#" className="button-emp">
                            Discover more
                        </a>
                    </div>
                    <div className="heading-image d-flex justify-content-end">
                        <img src={illustration} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
