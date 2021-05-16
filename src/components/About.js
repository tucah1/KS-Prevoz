import React, { Fragment } from "react";
import { connect } from "react-redux";

//images
import img from "../images/headingillustration.png";

export const About = () => {
    return (
        <>
            <div className="position-relative">
                <div className="background-wrapper">
                    <div className="background-col"></div>
                    <div className="background-wave"></div>
                </div>
                <div className="container mainContainer">
                    <div className="main-heading-wrapper">
                        <div className="main-heading-line">
                            <div className="main-heading">About KS Prevoz</div>
                        </div>
                    </div>
                    <div className="row no-gutters about-main">
                        <div className="about ">
                            <p>
                                This web application is a project done for CS308
                                Software Engineering class, Spring 2021. It was
                                done by Group 9 which consists of four members:
                                Muhammed Mušanović, Harun Tucaković, Fejsal
                                Perva and Šejla Burnić.
                            </p>
                            <p>
                                The reason for doing this project is because we
                                have found that information about public
                                transport lines is difficult to obtain and often
                                incorrect. This application is meant to solve
                                that problem by not only making search for lines
                                easier for users of public transport but also
                                for the administration of public transport
                                companies by imposing a standard input format
                                for lines.
                            </p>
                            <p>
                                The web application was done in JavaScript. The
                                frontend was implemented using React.js (with
                                Redux as state manager) while the backend was
                                done using Node.js, Express, and mySQL.
                            </p>
                        </div>
                        <div className="about-img  d-flex flex-column justify-content-center ">
                            <img src={img} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(About);
