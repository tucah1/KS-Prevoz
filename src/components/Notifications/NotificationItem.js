import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const NotificationItem = ({ subject, message, date }) => {
    return (
        <>
            <div>
                <div className="notif-item">
                    <h5 className="notif-subject">{subject}</h5>
                    <Moment
                        className="notif-date"
                        date={date}
                        format={"\\S\\ent on dddd, MMMM D, YYYY, \\a\\t LT"}
                    />

                    <p className="notif-message">{message} </p>
                </div>
            </div>
        </>
    );
};

NotificationItem.propTypes = {};

export default NotificationItem;
