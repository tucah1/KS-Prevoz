import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getScheduleList, removeScheduleFile } from "../../actions/admin";
import AddNewLine from "./AddNewLine";
import EditLine from "./EditLine";
import Modal from "@material-ui/core/Modal";
import { Pagination } from "@material-ui/lab";

export const ScheduleList = ({
    loading,
    getScheduleList,
    linesList,
    removeScheduleFile,
    lineScheduleFile,
    linesListPagesConfig: { pagesNumber, currentPage },
}) => {
    useEffect(() => {
        setmodalAddnewLine(false);
        getScheduleList(currentPage, transTypeChecked, "_");
    }, [getScheduleList]);

    //add new line
    const [modalAddnewLine, setmodalAddnewLine] = useState(false);

    const handleAddNewLineModalClose = () => {
        setmodalAddnewLine(false);
        // getScheduleList();
    };
    //edit line
    const [modalEditLine, setmodalEditLine] = useState(false);

    const handleEditLineModalClose = () => {
        setmodalEditLine(false);
        removeScheduleFile(lineScheduleFile);
    };

    const [editlineData, seteditlineData] = useState({
        toPoint: "",
        fromPoint: "",
        lineId: "",
        transType: "",
    });

    //pagination
    const onPageChange = (page) => {
        if (page !== currentPage) {
            if (searchQuery === "") {
                getScheduleList(page, transTypeChecked, "_");
            } else {
                getScheduleList(page, transTypeChecked, searchQuery);
            }
        }
    };

    //search
    const [searchQuery, setsearchQuery] = useState("");

    const onChnageSearchQuery = (e) => {
        if (e.target.value === "") {
            getScheduleList(1, transTypeChecked, "_");
        } else {
            getScheduleList(1, transTypeChecked, e.target.value);
        }

        setsearchQuery(e.target.value);
    };

    const [transTypeArray] = useState([
        "All",
        "Bus",
        "Tram",
        "Trolley",
        "Minibus",
    ]);

    const [transTypeChecked, settransTypeChecked] = useState("All");

    const onChangeTransType = (e) => {
        if (searchQuery === "") {
            getScheduleList(1, e.target.name.toLowerCase(), "_");
        } else {
            getScheduleList(1, e.target.name.toLowerCase(), searchQuery);
        }

        settransTypeChecked(e.target.name);
    };

    return (
        <>
            <>
                <div className="favorites">
                    <div className="background-wrapper">
                        <div className="background-col"></div>
                        <div className="background-wave"></div>
                    </div>
                    <div className="container mainContainer">
                        <div className="main-heading-wrapper">
                            <div className="main-heading-line">
                                <div className="main-heading">
                                    Schedule list
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="sch-srch d-flex justify-content-between align-items-center">
                                    <div className="d-flex flex-column">
                                        <input
                                            type="text"
                                            name="searchQuery"
                                            className="search"
                                            placeholder="Search..."
                                            spellCheck={false}
                                            value={searchQuery}
                                            autoComplete="off"
                                            onChange={(e) => {
                                                onChnageSearchQuery(e);
                                            }}
                                        />
                                        <div className="trantypes-wrapper">
                                            {transTypeArray.map(
                                                (type, index) => (
                                                    <label
                                                        htmlFor={type}
                                                        className="radio-button"
                                                        key={index}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={type}
                                                            id={type}
                                                            checked={
                                                                transTypeChecked ===
                                                                type
                                                            }
                                                            onChange={(e) => {
                                                                onChangeTransType(
                                                                    e
                                                                );
                                                            }}
                                                        />
                                                        <span>{type}</span>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            className="button-emp add-new-line"
                                            onClick={() => {
                                                setmodalAddnewLine(true);
                                            }}
                                        >
                                            Add new line
                                        </button>
                                    </div>
                                </div>
                                {loading ? (
                                    <Spinner small={true} />
                                ) : (
                                    <>
                                        {linesList.length !== 0 ? (
                                            <>
                                                {linesList.map((line) => (
                                                    <Fragment
                                                        key={line.line_id}
                                                    >
                                                        <div className="fav-item d-flex justify-content-between align-items-center">
                                                            <div className="fav-item-left d-flex flex-row">
                                                                <p className="fav-line-name">
                                                                    {
                                                                        line.from_point
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        line.to_point
                                                                    }
                                                                </p>
                                                                <p className="fav-line-type d-flex align-items-center ">
                                                                    {
                                                                        line.transport_type
                                                                    }
                                                                </p>
                                                            </div>
                                                            <button
                                                                className="sch-item-right"
                                                                onClick={() => {
                                                                    seteditlineData(
                                                                        {
                                                                            toPoint:
                                                                                line.to_point,
                                                                            fromPoint:
                                                                                line.from_point,
                                                                            lineId: line.line_id,
                                                                            transType:
                                                                                line.transport_type,
                                                                        }
                                                                    );
                                                                    setmodalEditLine(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <i className="fas fa-cogs"></i>
                                                            </button>
                                                        </div>
                                                    </Fragment>
                                                ))}

                                                <Pagination
                                                    count={pagesNumber}
                                                    page={currentPage}
                                                    classes={{
                                                        root: "pagination",
                                                        ul: "pagination-item",
                                                    }}
                                                    onChange={(e, page) => {
                                                        onPageChange(page);
                                                    }}
                                                    color="primary"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div className="favorites-message schedulelist-message">
                                                    <p>
                                                        There are no lines that
                                                        match search parameters.
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    open={modalAddnewLine}
                    onClose={handleAddNewLineModalClose}
                    onEscapeKeyDown={handleAddNewLineModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <>
                        <AddNewLine />
                    </>
                </Modal>
                <Modal
                    open={modalEditLine}
                    onClose={handleEditLineModalClose}
                    onEscapeKeyDown={handleEditLineModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <>
                        <EditLine
                            fPoint={editlineData.fromPoint}
                            tPoint={editlineData.toPoint}
                            lId={editlineData.lineId}
                            tType={editlineData.transType}
                            handleClose={handleEditLineModalClose}
                        />
                    </>
                </Modal>
            </>
        </>
    );
};

ScheduleList.propTypes = {
    loading: PropTypes.bool.isRequired,
    getScheduleList: PropTypes.func.isRequired,
    linesList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.loading.loading,
    linesList: state.admin.linesList,
    lineScheduleFile: state.admin.lineScheduleFile,
    linesListPagesConfig: state.admin.linesListPagesConfig,
});

const mapDispatchToProps = { getScheduleList, removeScheduleFile };

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);
