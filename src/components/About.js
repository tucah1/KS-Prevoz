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
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Eligendi quam delectus
                                quisquam temporibus cupiditate. Harum soluta
                                explicabo eveniet voluptatibus ex, impedit
                                dolorum magni libero minima neque voluptatum
                                exercitationem dignissimos, saepe fugiat natus!
                                Possimus corrupti temporibus amet quae alias ab
                                aliquid vero sed reiciendis dolorum tempore
                                voluptas obcaecati nesciunt consequuntur
                                quaerat, labore molestias deserunt quos et
                                laborum enim blanditiis incidunt dicta
                                voluptatem! Nesciunt reiciendis at officiis
                                repellendus sunt blandi in!
                            </p>
                            <p>
                                Possimus corrupti temporibus amet quae alias ab
                                aliquid vero sed reiciendis dolorum tempore
                                voluptas obcaecati nesciunt consequuntur
                                quaerat, labore molestias deserunt quos et
                                laborum enim blanditiis incidunt dicta
                                voluptatem! Nesc in!
                            </p>
                            <p>
                                Possimus corrupti temporibus amet quae alias ab
                                aliquid vero sed reiciendis dolorum tempore
                                voluptas obcaecati nesciunt consequuntur
                                quaerat, labore molestias deserunt quos et
                                laborum enim blanditiis incidunt dicta
                                voluptatem! Nesc in!
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
