import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            loading ? (
                <>
                    <p>Loading...</p>
                </>
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
