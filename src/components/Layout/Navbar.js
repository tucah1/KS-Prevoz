import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";

import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Settings from "../Settings";

// icons
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const Navbar = ({
    isAuthenticated,
    logout,
    userLevel,
    initials,
    scrollActive,
}) => {
    useEffect(() => {
        const nav = document.querySelector("nav");
        if (nav !== null) {
            if (scrollActive && window.innerWidth > 992) {
                nav.classList.add("nav-top");
                window.addEventListener("scroll", () => {
                    if (nav !== null) {
                        nav.classList.toggle(
                            "nav-top",
                            window.scrollY < 100 && window.innerWidth > 991
                        );
                    }
                });

                return () => {
                    window.removeEventListener("scroll", () => {});
                };
            } else if (scrollActive !== true && window.innerWidth < 992) {
                nav.classList.remove("nav-top");
            }
        }

        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, [scrollActive]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 991);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => {
                const ismobile = window.innerWidth < 991;
                if (ismobile !== isMobile) {
                    setIsMobile(ismobile);
                    const nav = document.querySelector("nav");
                    if (nav !== null) {
                        nav.classList.remove("nav-top");
                    }
                }
            },
            false
        );
    }, [isMobile]);

    useEffect(() => {
        if (isAuthenticated) {
            setmodalSigninup(false);
            setmodalSettings(false);
            setuserOptions(false);
        }
    }, [isAuthenticated]);

    const [displayNav, setdisplayNav] = useState(false);

    //modal for sign in/up
    const [modalSigninup, setmodalSigninup] = useState(false);
    //if authType is true, display Login, false -> display Register
    const [authType, setauthType] = useState(true);

    //display/hide user options
    const [userOptions, setuserOptions] = useState(false);

    //modal for user settings
    const [modalSettings, setmodalSettings] = useState(false);

    const handleCloseSigninModal = () => {
        setmodalSigninup(false);
    };

    const handleCloseSettingsModal = () => {
        setmodalSettings(false);
    };

    const handleAuthType = () => {
        setauthType(!authType);
    };

    return (
        <>
            <nav
                className={
                    !displayNav
                        ? "navbar navbar-expand-lg"
                        : "navbar navbar-expand-lg nav-exp"
                }
            >
                <Link className="navbar-brand" to="/">
                    <span>KS</span> Prevoz
                </Link>
                <button
                    className={
                        displayNav
                            ? "navbar-toggler"
                            : " navbar-toggler collapsed"
                    }
                    data-toggle="collapse"
                    data-target="#collapse_target"
                    aria-expanded={displayNav}
                    onClick={() => {
                        setdisplayNav(!displayNav);
                    }}
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div
                    className={
                        displayNav
                            ? "navbar-collapse justify-content-between main-menu collapse show "
                            : "navbar-collapse justify-content-between main-menu collapse"
                    }
                    id="collapse_target"
                >
                    <ul className="navbar-nav nav-middle">
                        <li className="nav-item">
                            {isAuthenticated && userLevel === 2 ? (
                                <>
                                    <Link
                                        to="/schedule-list"
                                        className="navbar-link"
                                        onClick={() => {
                                            setdisplayNav(false);
                                        }}
                                    >
                                        {" "}
                                        SCHEDULES{" "}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <a
                                        href="/#schedule"
                                        className="navbar-link"
                                        onClick={() => {
                                            setdisplayNav(false);
                                        }}
                                    >
                                        {" "}
                                        SCHEDULES{" "}
                                    </a>
                                </>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/find-routes"
                                className="navbar-link"
                                onClick={() => {
                                    setdisplayNav(false);
                                }}
                            >
                                FIND ROUTES
                            </Link>
                        </li>
                        {isAuthenticated && userLevel === 1 ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/favorites"
                                        className="navbar-link"
                                        onClick={() => {
                                            setdisplayNav(false);
                                        }}
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
                                        onClick={() => {
                                            setdisplayNav(false);
                                        }}
                                    >
                                        {" "}
                                        NOTIFICATIONS{" "}
                                    </Link>
                                </li>
                            </>
                        ) : null}
                        <li className="nav-item">
                            <Link
                                to="/about"
                                className="navbar-link"
                                onClick={() => {
                                    setdisplayNav(false);
                                }}
                            >
                                {" "}
                                ABOUT{" "}
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav nav-right">
                        {isAuthenticated ? (
                            <>
                                <div
                                    className="user-btn-wrapper"
                                    onBlur={() => {
                                        setuserOptions(false);
                                    }}
                                >
                                    <button
                                        className="button-emp user-btn"
                                        onClick={() => {
                                            setuserOptions(!userOptions);
                                        }}
                                    >
                                        {" "}
                                        {initials}{" "}
                                    </button>
                                    {userOptions && (
                                        <>
                                            <div className="user-options d-flex flex-column">
                                                <button
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    onClick={() => {
                                                        setmodalSettings(true);
                                                        setuserOptions(false);
                                                        setdisplayNav(false);
                                                    }}
                                                >
                                                    <SettingsIcon /> Settings
                                                </button>
                                                <button
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    onClick={() => {
                                                        logout();
                                                        setuserOptions(false);
                                                        setdisplayNav(false);
                                                    }}
                                                >
                                                    <ExitToAppIcon /> Log out
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <li className="nav-item d-flex align-items-center">
                                    <button
                                        to="/contact"
                                        className="navbar-link"
                                        onClick={() => {
                                            setmodalSigninup(true);
                                            setauthType(true);
                                            setdisplayNav(false);
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
                                            setmodalSigninup(true);
                                            setauthType(false);
                                            setdisplayNav(false);
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
                open={modalSigninup}
                onClose={handleCloseSigninModal}
                onEscapeKeyDown={handleCloseSigninModal}
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
            <Modal
                open={modalSettings}
                onClose={handleCloseSettingsModal}
                onEscapeKeyDown={handleCloseSettingsModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <Settings />
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
    initials: state.user.initials,
});

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
