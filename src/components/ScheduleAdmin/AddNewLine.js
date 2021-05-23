import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNewLine } from "../../actions/admin";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";

export const AddNewLine = ({ addNewLine, handleClose }) => {
    const [formData, setformData] = useState({
        fromPoint: "",
        toPoint: "",
        transportType: "",
        file: "",
    });

    const { fromPoint, toPoint, transportType, file } = formData;

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
        if (
            fromPoint.length === 0 &&
            toPoint.length === 0 &&
            transportType.length === 0
        ) {
            const fileName = e.target.files[0].name.split("-");
            if (fileName.length === 3) {
                setformData({
                    ...formData,
                    fromPoint: fileName[0].trim(),
                    toPoint: fileName[1].trim(),
                    transportType: fileName[2].replace(".csv", "").trim(),
                    file: e.target.files[0],
                });
            } else {
                setformData({
                    ...formData,
                    file: e.target.files[0],
                });
            }
        } else {
            setformData({
                ...formData,
                file: e.target.files[0],
            });
        }
        if (e.target.files[0])
            setfileBtnName(e.target.files[0].name.substring(0, 15) + "...");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("to_point", toPoint);
        data.append("from_point", fromPoint);
        data.append("transport_type", transportType);
        addNewLine(data);
        setformData({
            fromPoint: "",
            toPoint: "",
            transportType: "",
            file: "",
        });
        setfileBtnName("");
        document.getElementById("scheduleFile").value = "";
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
                    <h5 className="addline-heading">Add new line</h5>
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
                                required
                                onChange={(e) => {
                                    handleFileUpload(e);
                                }}
                            />
                        </label>

                        <p>
                            Only .csv file is suported. Click{" "}
                            <a href="#/" className="purple">
                                <strong>here</strong>
                            </a>{" "}
                            to download sample file.
                        </p>

                        <button className="button-emp addline-btn ml-auto">
                            Add line
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

AddNewLine.propTypes = {
    addNewLine: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { addNewLine };

export default connect(mapStateToProps, mapDispatchToProps)(AddNewLine);
