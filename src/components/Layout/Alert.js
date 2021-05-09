import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertMaterialUI from "@material-ui/lab/Alert";
import { removeAlert } from "../../actions/alert";

const Alert = ({ alerts, removeAlert }) => {
    return (
        <Fragment>
            <div className="alert-wrapper">
                {alerts.map((alert) => (
                    <AlertMaterialUI
                        variant="filled"
                        severity={alert.alertType}
                        key={alert.id}
                        className="alert"
                        onClose={() => {
                            removeAlert(alert.id);
                        }}
                    >
                        {alert.msg}
                    </AlertMaterialUI>
                ))}
            </div>
        </Fragment>
    );
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

const mapDispatchToProps = { removeAlert };

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
