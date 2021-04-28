import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getScheduleList, removeScheduleFile } from "../../actions/admin";
import AddNewLine from "./AddNewLine";
import EditLine from "./EditLine";
import Modal from "@material-ui/core/Modal";

export const ScheduleList = ({
    loading,
    getScheduleList,
    linesList,
    removeScheduleFile,
    lineScheduleFile,
}) => {
    useEffect(() => {
        setmodalAddnewLine(false);
        getScheduleList();
    }, [getScheduleList]);

    //add new line
    const [modalAddnewLine, setmodalAddnewLine] = useState(false);

    const handleAddNewLineModalClose = () => {
        setmodalAddnewLine(false);
        getScheduleList();
    };
    //edit line
    const [modalEditLine, setmodalEditLine] = useState(false);

    const handleEditLineModalClose = () => {
        setmodalEditLine(false);
        getScheduleList();
        removeScheduleFile(lineScheduleFile);
    };

    const [editlineData, seteditlineData] = useState({
        toPoint: "",
        fromPoint: "",
        lineId: "",
        transType: "",
    });

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
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
                                        <div>
                                            <input
                                                type="text"
                                                name=""
                                                className="search"
                                                placeholder="Search..."
                                            />
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
                                    {linesList.map((line) => (
                                        <Fragment key={line.line_id}>
                                            <div className="fav-item d-flex justify-content-between align-items-center">
                                                <div className="fav-item-left d-flex flex-row">
                                                    <p className="fav-line-name">
                                                        {line.from_point} -{" "}
                                                        {line.to_point}
                                                    </p>
                                                    <p className="fav-line-type">
                                                        {line.transport_type}
                                                    </p>
                                                </div>
                                                <button
                                                    className="sch-item-right"
                                                    onClick={() => {
                                                        seteditlineData({
                                                            toPoint:
                                                                line.to_point,
                                                            fromPoint:
                                                                line.from_point,
                                                            lineId:
                                                                line.line_id,
                                                            transType:
                                                                line.transport_type,
                                                        });
                                                        setmodalEditLine(true);
                                                    }}
                                                >
                                                    <i className="fas fa-sliders-h"></i>
                                                </button>
                                            </div>
                                        </Fragment>
                                    ))}
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
                            />
                        </>
                    </Modal>
                </>
            )}
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
});

const mapDispatchToProps = { getScheduleList, removeScheduleFile };

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);
