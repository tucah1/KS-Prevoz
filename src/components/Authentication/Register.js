import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { googleLogin, register } from "../../actions/auth";
import GoogleLogin from "react-google-login";
import { setAlert } from "../../actions/alert";

export const Register = ({
    handleAuthType,
    isAuthenticated,
    register,
    googleLogin,
    setAlert,
}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
    });

    const { firstName, lastName, email, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords do not match!", "error");
        } else {
            const data = {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            };
            register(data);
        }
    };

    const handleGoogleLogin = (googleData) => {
        googleLogin(googleData.getAuthResponse().id_token);
    };

    if (isAuthenticated) {
        return <Redirect to="/favorites" />;
    }

    return (
        <>
            <div className="modal-wrapper">
                <div className="login ">
                    <div className="login-heading">
                        <button onClick={handleAuthType}>Sign in</button>
                        <button>
                            {" "}
                            <span>Sign up</span>
                        </button>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="input-fields reg">
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => onChange(e)}
                                placeholder="First name"
                                required
                            />{" "}
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => onChange(e)}
                                placeholder="Last name"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                required
                                placeholder="Password"
                                minLength={8}
                            />
                            <input
                                type="password"
                                name="password2"
                                value={password2}
                                onChange={(e) => onChange(e)}
                                minLength={8}
                                placeholder="Confirm password"
                                required
                            />
                        </div>
                        <div className="login-buttons d-flex justify-content-between">
                            <GoogleLogin
                                clientId={
                                    process.env.REACT_APP_GOOGLE_CLIENT_ID
                                }
                                buttonText="Google"
                                render={(renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        className="google"
                                        disabled={renderProps.disabled}
                                    >
                                        Google
                                    </button>
                                )}
                                icon={false}
                                disabledStyle={true}
                                onSuccess={handleGoogleLogin}
                                onFailure={handleGoogleLogin}
                                cookiePolicy={"single_host_origin"}
                            />
                            <button className="button-emp">Sign up</button>
                        </div>
                        <p className="login-text">
                            don’t have account?{" "}
                            <button onClick={handleAuthType}>sign in</button>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

Register.propTypes = {
    handleAuthType: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    googleLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { register, googleLogin, setAlert };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
