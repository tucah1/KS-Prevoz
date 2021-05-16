import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNotifications, sendNotification } from "../../actions/admin";
import { Fragment } from "react";
import NotificationItem from "./NotificationItem";

export const Notifications = ({
    sendNotification,
    getNotifications,
    notifications,
}) => {
    useEffect(() => {
        getNotifications();
    }, [getNotifications]);
    const [formData, setformData] = useState({
        subject: "",
        message: "",
    });

    const { subject, message } = formData;

    const onChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        sendNotification({ subject, body: message });
        setformData({ subject: "", message: "" });
    };

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
                            <div className="main-heading">Notifications</div>
                        </div>
                    </div>
                    <div className="notif-main">
                        <div className="row no-gutters contact-form d-flex flex-column ">
                            <form
                                onSubmit={(e) => {
                                    onSubmit(e);
                                }}
                                className="d-flex flex-column form col-12 "
                            >
                                <input
                                    type="text"
                                    name="subject"
                                    value={subject}
                                    required
                                    autoComplete="off"
                                    onChange={(e) => onChange(e)}
                                    placeholder="Subject"
                                />

                                <textarea
                                    name="message"
                                    rows="12"
                                    value={message}
                                    placeholder="Message"
                                    required
                                    onChange={(e) => onChange(e)}
                                ></textarea>
                                <p>
                                    Message will be sent to all users that have
                                    notifications turned on.
                                </p>
                                <button className="button-emp notf-send ml-auto">
                                    Send
                                </button>
                            </form>
                        </div>
                        <div className="notification-list">
                            <h5 className="notif-recent">
                                Recent notifications
                            </h5>
                            {notifications.map((notf) => (
                                <Fragment key={notf.notification_id}>
                                    <NotificationItem
                                        subject={notf.subject}
                                        message={notf.body}
                                        date={notf.date_of_creation}
                                    />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Notifications.propTypes = {
    sendNotification: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    notifications: state.admin.notifications,
});

const mapDispatchToProps = { sendNotification, getNotifications };

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
