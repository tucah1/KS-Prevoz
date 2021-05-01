import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            loading ? (
                <Spinner />
            ) : isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapSateteToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapSateteToProps)(PrivateRoute);
