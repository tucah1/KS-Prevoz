import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { logout } from "../actions/auth";

import Login from "./Authentication/Login";
import Register from "./Authentication/Register";

export const Navbar = ({ isAuthenticated, logout, userLevel }) => {
    useEffect(() => {
        if (isAuthenticated) {
            setmodalOpen(false);
        }
    }, [isAuthenticated]);
    const [modalOpen, setmodalOpen] = useState(false);
    //if authType is true, display Login, false -> display Register
    const [authType, setauthType] = useState(true);

    const handleClose = () => {
        setmodalOpen(false);
    };

    const handleAuthType = () => {
        setauthType(!authType);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <p className="navbar-brand" href="#">
                    <span>KS</span> Prevoz
                </p>
                <button
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#collapse_target"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-between main-menu"
                    id="collapse_target"
                >
                    <ul className="navbar-nav nav-middle">
                        <li className="nav-item">
                            <a to="/" className="navbar-link">
                                {" "}
                                SCHEDULES{" "}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a to="/products" className="navbar-link">
                                FIND ROUTES
                            </a>
                        </li>
                        {isAuthenticated && userLevel == 1 ? (
                            <>
                                <li className="nav-item">
                                    <a to="/favorites" className="navbar-link">
                                        {" "}
                                        FAVORITES{" "}
                                    </a>
                                </li>
                            </>
                        ) : null}
                        {isAuthenticated && userLevel == 2 ? (
                            <>
                                <li className="nav-item">
                                    <a to="/favorites" className="navbar-link">
                                        {" "}
                                        NOTIFICATIONS{" "}
                                    </a>
                                </li>
                            </>
                        ) : null}
                        <li className="nav-item">
                            <a to="/about" className="navbar-link">
                                {" "}
                                ABOUT{" "}
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav nav-right">
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <li className="nav-item d-flex align-items-center">
                                    <button
                                        to="/contact"
                                        className="navbar-link"
                                        onClick={() => {
                                            setmodalOpen(true);
                                            setauthType(true);
                                        }}
                                    >
                                        {" "}
                                        Sign in{" "}
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        to="/contact"
                                        className="navbar-link button-emp"
                                        onClick={() => {
                                            setmodalOpen(true);
                                            setauthType(false);
                                        }}
                                    >
                                        Sign up
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                onEscapeKeyDown={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    {authType ? (
                        <Login handleAuthType={handleAuthType} />
                    ) : (
                        <Register handleAuthType={handleAuthType} />
                    )}
                </>
            </Modal>
        </>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    userLevel: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userLevel: state.auth.userLevel,
});

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
