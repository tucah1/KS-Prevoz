import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";

const DeleteLine = ({ fromPoint, toPoint, transType, handleYes, handleNo }) => {
    return (
        <div className="modal-wrapper">
            <div className="close-btn delete-close-btn" onClick={handleNo}>
                <Tooltip
                    title="Close"
                    placement="top"
                    arrow
                    enterDelay={700}
                    leaveDelay={100}
                >
                    <CloseIcon />
                </Tooltip>
            </div>
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
