import React from "react";
import PropTypes from "prop-types";

const DeleteLine = ({ fromPoint, toPoint, transType, handleYes, handleNo }) => {
    return (
        <div className="modal-wrapper">
            <div className="add-line delete-line d-flex flex-column">
                <h6 className="delete-line-heading">
                    Are you sure that you want to delete line{" "}
                    <span>
                        {fromPoint} - {toPoint} - {transType}
                    </span>
                    ?
                </h6>
                <p>This action cannot be undone!</p>
                <div className="delete-btns ml-auto">
                    <button onClick={handleNo} className="button-emp">
                        No
                    </button>
                    <button
                        onClick={handleYes}
                        className="button-emp delete-yes"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteLine.propTypes = {
    fromPoint: PropTypes.string.isRequired,
    toPoint: PropTypes.string.isRequired,
    transType: PropTypes.string.isRequired,
    handleNo: PropTypes.func.isRequired,
    handleYes: PropTypes.func.isRequired,
};

export default DeleteLine;
