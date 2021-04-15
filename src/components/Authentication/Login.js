import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { googleLogin, login } from "../../actions/auth";
import GoogleLogin from "react-google-login";

export const Login = ({
    handleAuthType,
    isAuthenticated,
    login,
    googleLogin,
}) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    const handleGoogleLogin = (googleData) => {
        googleLogin(googleData.getAuthResponse().id_token);
    };

    // if (isAuthenticated) {
    //     return <Redirect to="/" />;
    // }

    return (
        <>
            <div className="login-wrapper">
                <div className="login ">
                    <div className="login-heading">
                        <button>
                            <span>Sign in</span>
                        </button>
                        <button onClick={handleAuthType}>Sign up</button>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="input-fields">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength={8}
                                value={password}
                                onChange={(e) => onChange(e)}
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
                            <button className="button-emp">Sign in</button>
                        </div>
                        <p className="login-text">
                            don’t have account?{" "}
                            <button onClick={handleAuthType}>sign up</button>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

Login.propTypes = {
    handleAuthType: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { login, googleLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
