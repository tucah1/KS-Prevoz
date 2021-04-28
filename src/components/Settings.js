import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateSettings } from "../actions/user";
import { setAlert } from "../actions/alert";

const Settings = ({ user, updateSettings, setAlert }) => {
    useEffect(() => {
        setformData({
            ...formData,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            notifications: user.notifications === 1 ? true : false,
        });
        return () => {
            setformData({
                firstName: "",
                lastName: "",
                email: "",
                oldPassword: "",
                newPassword: "",
                newPasswordConfirm: "",
                notifications: false,
            });
        };
    }, []);

    const [formData, setformData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
        notifications: false,
    });

    const {
        firstName,
        lastName,
        email,
        oldPassword,
        newPassword,
        newPasswordConfirm,
        notifications,
    } = formData;

    const onChange = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const name = e.target.name;
        setformData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (changePassword) {
            if (newPassword !== newPasswordConfirm) {
                setAlert("Passwords must match!", "warning");
            } else {
                updateSettings({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    notifications: notifications ? 1 : 0,
                    password: newPassword,
                });
            }
        } else {
            updateSettings({
                first_name: firstName,
                last_name: lastName,
                email,
                notifications: notifications ? 1 : 0,
            });
        }
    };

    //logic to check if password will be changed
    const [changePassword, setchangePassword] = useState(false);

    useEffect(() => {
        if (
            oldPassword.length !== 0 ||
            newPassword.length !== 0 ||
            newPasswordConfirm.length !== 0
        ) {
            setchangePassword(true);
        }
        return () => {
            setchangePassword(false);
        };
    }, [oldPassword, newPassword, newPasswordConfirm]);

    return (
        <>
            <div className="modal-wrapper">
                <div className="settings">
                    <h5 className="set-heading">Settings</h5>
                    <form
                        onSubmit={(e) => {
                            onSubmit(e);
                        }}
                    >
                        <div className="set-main d-flex justify-content-between">
                            <div className="set-left d-flex flex-column">
                                <label>
                                    First name
                                    <input
                                        className="input"
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        required
                                        onChange={(e) => onChange(e)}
                                        placeholder="First name"
                                    />
                                </label>
                                <label>
                                    Last name
                                    <input
                                        className="input"
                                        type="text"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => onChange(e)}
                                        required
                                        placeholder="Last name"
                                    />
                                </label>
                                <label>
                                    Email
                                    <input
                                        className="input"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => onChange(e)}
                                        required
                                        placeholder="Email"
                                    />
                                </label>
                            </div>
                            <div className="set-right d-flex flex-column">
                                <label>
                                    Change password
                                    <input
                                        autoComplete="new-password"
                                        className="input"
                                        type="password"
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => onChange(e)}
                                        required={changePassword}
                                        placeholder="Old password"
                                    />
                                    <input
                                        className="input"
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => onChange(e)}
                                        required={changePassword}
                                        placeholder="New password"
                                    />
                                    <input
                                        className="input"
                                        type="password"
                                        name="newPasswordConfirm"
                                        value={newPasswordConfirm}
                                        onChange={(e) => onChange(e)}
                                        required={changePassword}
                                        placeholder="Confirm new password"
                                    />
                                </label>
                                <label className="flex-row">
                                    Notifications
                                    <input
                                        className="m-0"
                                        type="checkbox"
                                        checked={notifications}
                                        onChange={(e) => onChange(e)}
                                        name="notifications"
                                    />
                                </label>
                            </div>
                            <p>
                                If you do not want to change password, leave
                                those fields blank.
                            </p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="button-emp float-right"
                                id="save-btn"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

Settings.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user.user,
});

const mapDispatchToProps = { updateSettings, setAlert };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
