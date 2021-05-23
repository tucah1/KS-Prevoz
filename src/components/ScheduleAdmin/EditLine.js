import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteLine, editLine, getLineScheduleFile } from "../../actions/admin";
import DeleteLine from "./DeleteLine";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";

export const EditLine = ({
    fPoint,
    tPoint,
    lId,
    tType,
    handleClose,
    lineScheduleFile,
    getLineScheduleFile,
    editLine,
    deleteLine,
}) => {
    useEffect(() => {
        setformData({
            fromPoint: fPoint,
            toPoint: tPoint,
            transportType: tType,
            lineId: lId,
        });
    }, [fPoint, tPoint, tType, lId]);

    useEffect(() => {
        getLineScheduleFile(lId);
    }, [getLineScheduleFile, lId]);

    const [formData, setformData] = useState({
        fromPoint: "",
        toPoint: "",
        transportType: "",
        lineId: "",
        file: null,
    });

    const { fromPoint, toPoint, transportType, lineId, file } = formData;

    const [fileBtnName, setfileBtnName] = useState("");
    const onChange = (e) => {
        const val =
            e.target.type === "text"
                ? e.target.value
                : e.target.selectedOptions[0].text;
        setformData({
            ...formData,
            [e.target.name]: val,
        });
    };

    const handleFileUpload = (e) => {
        setformData({
            ...formData,
            file: e.target.files[0],
        });

        if (e.target.files[0])
            setfileBtnName(e.target.files[0].name.substring(0, 15) + "...");
    };
    //delete line logic
    const [modalDeleteLine, setmodalDeleteLine] = useState(false);

    const handleDeleteLineModalClose = () => {
        setmodalDeleteLine(false);
    };

    const handleDeleteLineNo = () => {
        setmodalDeleteLine(false);
    };

    const handleDeleteLineYes = () => {
        deleteLine(lineId);
        setmodalDeleteLine(false);
        handleClose();
    };
    //submit changes
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        if (file !== null) {
            data.append("file", file);
        }
        data.append("to_point", toPoint);
        data.append("from_point", fromPoint);
        data.append("transport_type", transportType);
        data.append("line_id", lineId);
        editLine(data);
    };

    return (
        <>
            <div className="modal-wrapper">
                <div className="close-btn" onClick={handleClose}>
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
                <div className="add-line">
                    <h5 className="addline-heading">Line settings</h5>
                    <form
                        onSubmit={(e) => {
                            onSubmit(e);
                        }}
                        className="addline-form d-flex flex-column"
                    >
                        <input
                            type="text"
                            className="input"
                            name="fromPoint"
                            value={fromPoint}
                            placeholder="From point"
                            onChange={(e) => {
                                onChange(e);
                            }}
                            required
                        />
                        <input
                            type="text"
                            className="input"
                            name="toPoint"
                            value={toPoint}
                            onChange={(e) => {
                                onChange(e);
                            }}
                            placeholder="To point"
                            required
                        />
                        <select
                            className="input addline-select"
                            required
                            name="transportType"
                            value={transportType}
                            onChange={(e) => {
                                onChange(e);
                            }}
                        >
                            <option
                                disabled={false}
                                hidden
                                value=""
                                id="firstOption"
                            >
                                Transport type
                            </option>
                            <option value="Bus">Bus</option>
                            <option value="Tram">Tram</option>
                            <option value="Trolley">Trolley</option>
                            <option value="Minibus">Minibus</option>
                        </select>

                        <label htmlFor="scheduleFile" className="upload-file">
                            {fileBtnName === ""
                                ? "Upload schedule"
                                : fileBtnName}
                            <input
                                type="file"
                                name="file"
                                id="scheduleFile"
                                accept=".csv"
                                onChange={(e) => {
                                    handleFileUpload(e);
                                }}
                            />
                        </label>
                        <p>
                            {" "}
                            Only .csv file is suported. Click{" "}
                            <a href="#/" className="purple">
                                <strong>here</strong>
                            </a>{" "}
                            to download sample file.
                        </p>

                        <a
                            href={lineScheduleFile}
                            className="upload-file"
                            download={`${fromPoint} - ${toPoint} - ${transportType}.csv`}
                        >
                            Export .csv
                        </a>

                        <p>Download existing schedule.</p>

                        <div className="ml-auto edit-btns">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setmodalDeleteLine(true);
                                }}
                                className="button-emp delete-line-btn"
                            >
                                Delete
                            </button>

                            <button className="button-emp  ml-auto">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                open={modalDeleteLine}
                onClose={handleDeleteLineModalClose}
                onEscapeKeyDown={handleDeleteLineModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <DeleteLine
                        fromPoint={fromPoint}
                        toPoint={toPoint}
                        transType={transportType}
                        handleNo={handleDeleteLineNo}
                        handleYes={handleDeleteLineYes}
                    />
                </>
            </Modal>
        </>
    );
};

EditLine.propTypes = {
    getLineScheduleFile: PropTypes.func.isRequired,
    editLine: PropTypes.func.isRequired,
    deleteLine: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    lineScheduleFile: state.admin.lineScheduleFile,
});

const mapDispatchToProps = { getLineScheduleFile, editLine, deleteLine };

export default connect(mapStateToProps, mapDispatchToProps)(EditLine);
