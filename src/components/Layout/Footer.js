import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Footer = ({ isAuthenticated, userLevel }) => {
    return (
        <>
            <div className="footer-wrapper">
                <div className="footer-wave"></div>
                <div className="footer d-flex flex-wrap justify-content-around">
                    <div className="d-flex align-items-center">
                        <Link className="navbar-brand" to="/">
                            <span>KS</span> Prevoz
                        </Link>
                    </div>

                    <div
                        className={
                            "navbar-collapse  main-menu d-flex align-items-center "
                        }
                        id="collapse_target"
                    >
                        <ul className="navbar-nav nav-middle d-flex flex-row justify-content-center">
                            <li className="nav-item">
                                {isAuthenticated && userLevel === 2 ? (
                                    <>
                                        <Link
                                            to="/schedule-list"
                                            className="navbar-link"
                                        >
                                            {" "}
                                            SCHEDULES{" "}
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/#schedule"
                                            className="navbar-link"
                                        >
                                            {" "}
                                            SCHEDULES{" "}
                                        </Link>
                                    </>
                                )}
                            </li>
                            <li className="nav-item">
                                <Link to="/find-routes" className="navbar-link">
                                    FIND ROUTES
                                </Link>
                            </li>
                            {isAuthenticated && userLevel === 1 ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/favorites"
                                            className="navbar-link"
                                        >
                                            {" "}
                                            FAVORITES{" "}
                                        </Link>
                                    </li>
                                </>
                            ) : null}
                            {isAuthenticated && userLevel === 2 ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/notifications"
                                            className="navbar-link"
                                        >
                                            {" "}
                                            NOTIFICATIONS{" "}
                                        </Link>
                                    </li>
                                </>
                            ) : null}
                            <li className="nav-item">
                                <Link to="/about" className="navbar-link">
                                    {" "}
                                    ABOUT{" "}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom d-flex justify-content-end">
                    <p>KS Prevoz &#169;2021</p>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userLevel: state.auth.userLevel,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
