import React from "react";
import PropTypes from "prop-types";

const DeleteLine = ({ fromPoint, toPoint, transType, handleYes, handleNo }) => {
    return (
        <div className="modal-wrapper">
            <div className="login">
                <p>
                    Are you sure that you want to delete line {fromPoint} -{" "}
                    {toPoint} - {transType}?
                </p>
                <br />
                <button onClick={handleNo}>No</button> <br />
                <br />
                <button onClick={handleYes}>Yes</button>
            </div>
        </div>
    );
};

DeleteLine.propTypes = {};

export default DeleteLine;
