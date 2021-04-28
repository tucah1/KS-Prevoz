import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteLine, editLine, getLineScheduleFile } from "../../actions/admin";
import DeleteLine from "./DeleteLine";
import Modal from "@material-ui/core/Modal";

export const EditLine = ({
    fPoint,
    tPoint,
    lId,
    tType,
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
    }, []);

    useEffect(() => {
        getLineScheduleFile(lId);
    }, []);

    const [formData, setformData] = useState({
        fromPoint: "",
        toPoint: "",
        transportType: "",
        lineId: "",
        file: null,
    });

    const { fromPoint, toPoint, transportType, lineId, file } = formData;

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
                <div className="login add-new-line">
                    <h5 className="set-heading">Edit Line</h5>
                    <form
                        onSubmit={(e) => {
                            onSubmit(e);
                        }}
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
                            className="input"
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
                        <a
                            href={lineScheduleFile}
                            download={`${fromPoint} - ${toPoint} - ${transportType}.csv`}
                        >
                            Export .csv
                        </a>
                        {/* <button
                            style={{ display: "block" }}
                            onClick={() => {
                                document.getElementById("scheduleFile").click();
                            }}
                        >
                            Upload schedule
                        </button> */}
                        <input
                            type="file"
                            name="file"
                            id="scheduleFile"
                            accept=".csv"
                            onChange={(e) => {
                                handleFileUpload(e);
                            }}
                            // style={{ display: "none" }}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setmodalDeleteLine(true);
                            }}
                        >
                            Delete line
                        </button>
                        <br />
                        <button>Edit line</button>
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
